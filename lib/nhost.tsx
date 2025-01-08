"use client";

import { SessionProvider } from "next-auth/react";
import { NhostClient } from '@nhost/nhost-js'
import { NhostProvider } from "@nhost/nextjs";
import { useRouter } from "next/router";
import { useEffect } from "react";



export function nhostProviders({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const nhost = new NhostClient({
    authUrl: "https://your-nhost-project-url", // Replace with your Nhost backend URL
  });

  useEffect(() => {
    // Redirect to login if not authenticated (optional)
    if (!nhost.auth.isAuthenticated()) {
      router.push("/login");
    }
  }, [router]);

  return (
    <SessionProvider>
      <NhostProvider nhost={nhost}>{children}</NhostProvider>
    </SessionProvider>
  );
}
