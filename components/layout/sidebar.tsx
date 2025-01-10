"use client";

import { useEffect, useState } from "react";
import { Menu, X, History, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";
import { nhost } from "@/lib/nhost";
import { useAuthenticationStatus } from "@nhost/nextjs";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";
import { useStore } from "@/zustand/zustandStore";

interface HistoryItem {
  id: string;
  url: string;
  title: string;
  response: string;
  email: string;
}

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [history, sethistory] = useState<HistoryItem[]>([]);
  const [email, setemail] = useState("");
  const [mounted, setMounted] = useState(false);
  const { isAuthenticated, isLoading, error, isError } =
    useAuthenticationStatus();

  const storeUrl = useStore((state: any) => state.url);
  const updateUrl = useStore((state: any) => state.updateUrl);
  const updateTitle = useStore((state: any) => state.updateTitle);
  const updateResponse = useStore((state: any) => state.updateResponse);

  const router = useRouter();
  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     // redirect("/login");
  //     redirect("/");
  //   }
  // }, [isAuthenticated]);

  // if (!mounted) {
  //   return null;
  // }

  useEffect(() => {
    if (!isAuthenticated) {
      // redirect("/login");
      redirect("/");
    }

    const getUserDetails = async () => {
      if (isAuthenticated) {
        // Fetch the user details
        const user = await nhost.auth.getUser();

        console.log("Logged in user:", user);

        if (!user) {
          console.error("No user found");
          return;
        }

        setemail(user.email ?? "");

        const request = await fetch(`api/get-user-data/${user.email}`);
        const dataOfUser = await request.json();

        console.log("dataof uses of history:", dataOfUser);

        sethistory(dataOfUser.userHistoryData);
      }
    };

    getUserDetails();
  }, [isAuthenticated]);

  console.log("history of users set using usestate:", history);
  // console.log("storeurl value:", storeUrl);

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X /> : <Menu />}
      </Button>

      <div
        className={`fixed top-0 left-0 h-full w-80 bg-background border-r transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } z-40`}
      >
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold mx-auto">History</h2>
            <History className="h-5 w-5" />
          </div>

          <div className="space-y-4 h-[75vh] overflow-auto ">
            {history.length === 0 ? (
              <p className="text-muted-foreground text-sm">No history yet</p>
            ) : (
              history.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-lg border hover:bg-accent cursor-pointer"
                  onClick={() => {
                    updateUrl(item.url);
                    updateTitle(item.title);
                    updateResponse(item.response);
                    // router.push("/dashboard");
                  }}
                >
                  <h3 className="font-medium truncate">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {/* {new Date(item.date).toLocaleDateString()} */}
                  </p>
                </div>
              ))
            )}
          </div>

          <Button
            variant="ghost"
            className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
            // onClick={() => signOut()}
            onClick={() => {
              nhost.auth.signOut();
            }}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
}
