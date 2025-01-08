"use client";

import { useEffect, useState } from "react";
import { Menu, X, History, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";
import { nhost } from "@/lib/nhost";
import { useAuthenticationStatus } from "@nhost/nextjs";
import { redirect } from "next/navigation";

interface HistoryItem {
  id: string;
  url: string;
  title: string;
  summary: string;
  date: string;
}

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [history] = useState<HistoryItem[]>([]);
  const [mounted, setMounted] = useState(false);
  const { isAuthenticated, isLoading, error, isError } =
    useAuthenticationStatus();

  useEffect(() => {
    if (!isAuthenticated) {
      // redirect("/login");
      redirect("/");
    }
  }, [isAuthenticated]);

  // if (!mounted) {
  //   return null;
  // }

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

          <div className="space-y-4">
            {history.length === 0 ? (
              <p className="text-muted-foreground text-sm">No history yet</p>
            ) : (
              history.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-lg border hover:bg-accent cursor-pointer"
                >
                  <h3 className="font-medium truncate">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {new Date(item.date).toLocaleDateString()}
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
