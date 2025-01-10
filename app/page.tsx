"use client";

import { signIn } from "next-auth/react";
import { Github, Chrome, YoutubeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { nhost } from "@/lib/nhost";
import { useAuthenticationStatus } from "@nhost/nextjs";

export default function LoginPage() {
  // const { data: session } = useSession();
  const router = useRouter()
  const { isAuthenticated, isLoading, error, isError } =
    useAuthenticationStatus();

  // if (session) {
  //   redirect("/")
  // }

  useEffect(() => {
    if (isAuthenticated) {

      // redirect("/dashboard");
       router.push('dashboard')
    }
  }, [isAuthenticated])

  // useEffect(() => {
  //   const handleAuthChange = async () => {
  //     if (isAuthenticated) {
  //       // Fetch the user details
  //       const user = (await nhost.auth.getUser()) || null;

  //       console.log("Logged in user:", user);

  //       if (!user) {
  //         console.error("No user found");
  //         return;
  //       }

  //       console.log("Logged in user:", user);

  //       // Example: Send user details to your backend API
  //       try {
  //         const reqToBackend = await fetch("api/save-user", {
  //           method: "POST",
  //           headers: {
  //             // Accept: "application/json",
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify({
  //             id: user.id,
  //             username: user.displayName,
  //             email: user.email,
  //             profilepic:user.avatarUrl
  //             // displayName: user.display_name || user.metadata.name,
  //             // avatarUrl: user.avatar_url,
  //           }),
  //         });

  //         const data = await reqToBackend.json()
  //         console.log('data of reqto backend:',data);

  //       } catch (error) {
  //         console.error("Error saving user:", error);
  //       }

  //       // Redirect after storing user data
  //       // redirect("/dashboard");
  //       router.push('/dashboard')
  //     }
  //   };

  //   handleAuthChange();
  // }, [isAuthenticated]);

  console.log("authentication of nhost:", isAuthenticated, nhost.auth);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-accent">
      <Card className="w-full max-w-md p-8 space-y-8 backdrop-blur-sm bg-opacity-50">
        <div className="flex flex-col items-center space-y-2">
          <YoutubeIcon className="h-16 w-16 text-red-600" />
          <h1 className="text-3xl font-bold text-center">
            Welcome to YouTube Summarizer
          </h1>
          <p className="text-muted-foreground text-center">
            Sign in to access YouTube video summaries
          </p>
        </div>

        <div className="space-y-4">
          <Button
            variant="outline"
            className="w-full py-6 space-x-4 relative hover:bg-accent"
            // onClick={() => signIn("google", { callbackUrl: "/" })}
            onClick={() =>
              nhost.auth.signIn({
                provider: "google",
              })
            }
          >
            <Chrome className="w-5 h-5 absolute left-4" />
            <span>Continue with Google</span>
          </Button>

          <Button
            variant="outline"
            className="w-full py-6 space-x-4 relative hover:bg-accent"
            // onClick={() => signIn("github", { callbackUrl: "/" })}
            onClick={() =>
              nhost.auth.signIn({
                provider: "github",
              })
            }
          >
            <Github className="w-5 h-5 absolute left-4" />
            <span>Continue with GitHub</span>
          </Button>
        </div>

        <div className="text-center text-sm text-muted-foreground">
          By signing in, you agree to our{" "}
          <a href="#" className="underline hover:text-foreground">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="underline hover:text-foreground">
            Privacy Policy
          </a>
        </div>
      </Card>
    </main>
  );
}
