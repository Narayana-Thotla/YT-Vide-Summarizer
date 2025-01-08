"use client";

// import { SessionProvider } from "next-auth/react";
import { NhostClient } from "@nhost/nextjs";
import { NhostProvider } from "@nhost/nextjs";
import { nhost } from "@/lib/nhost";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  

  useEffect(() => {
    // Redirect to login if not authenticated (optional)
    if (!nhost.auth.isAuthenticated()) {
      router.push("/login");
    }
  }, [router]);

  return (
    // <SessionProvider>
      <NhostProvider nhost={nhost}>{children}</NhostProvider>
    // </SessionProvider>
  );
}
