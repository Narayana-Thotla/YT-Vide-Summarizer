"use client";

import { useEffect, useState } from "react";
import { YoutubeIcon, FileText, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Sidebar } from "@/components/layout/sidebar";
import ResponseRenderer from "@/components/ResponseRender";
import { useAuthenticationStatus } from "@nhost/nextjs";

export default function Home() {
  // const { data: session, status } = useSession({
  //   required: true,
  //   onUnauthenticated() {
  //     redirect("/login");
  //   },
  // });

  const { isAuthenticated, isLoading, error, isError } =
    useAuthenticationStatus();

useEffect(() => {
  if (!isAuthenticated) {
    // redirect("/login");
    redirect("/");
  }
}, [isAuthenticated])



  

  // console.log("session fo user:", session);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState("");

  const [N8NResponse, setN8NResponse] = useState({
    title: "",
    description: "",
    response: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: Implement API call to get summary
    const res = await fetch(
      "https://n8n-dev.subspace.money/webhook-test/4e71b2fe-5b16-4f33-9435-0291655b8be6",
      {
        method: "POST", // Specify the HTTP method
        headers: {
          "Content-Type": "application/json",
          Authorization: process.env.HEADER_AUTH_CREDENTIAL || "",
        },
        // body: JSON.stringify(url), // Convert data to JSON

        body: JSON.stringify({ url: url }),
      }
    );

    const result = await res.json();
    console.log("result of res of url :", result);

    if (result) {
      setN8NResponse((prevState) => ({
        ...prevState, // this keeps the previous values
        title: result.title,
        description: result.description,
        response: result.response,
      }));
    }

    setTimeout(() => {
      setSummary(
        "This is a sample summary of the video. Replace this with actual API integration."
      );
      setLoading(false);
    }, 2000);
  };

  // if (status === "loading") {
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent">
      <Sidebar />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center mb-8 pt-16">
          <YoutubeIcon className="h-12 w-12 text-red-600 mb-4" />
          <h1 className="text-4xl font-bold mb-2">YouTube Summarizer</h1>
          <p className="text-muted-foreground">
            Get quick summaries of YouTube videos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Left Side - Input Form */}
          <Card className="p-6 shadow-lg backdrop-blur-sm bg-opacity-50">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">YouTube URL</label>
                <Input
                  type="url"
                  placeholder="Paste YouTube video URL here"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={loading || !url}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Summary...
                  </>
                ) : (
                  <>
                    <FileText className="mr-2 h-4 w-4" />
                    Generate Summary
                  </>
                )}
              </Button>
            </form>
          </Card>

          {/* Right Side - Summary Display */}
          <Card className="p-6 shadow-lg backdrop-blur-sm bg-opacity-50">
            <h2 className="text-xl font-semibold mb-4">Video Summary</h2>
            <div className="prose dark:prose-invert max-w-none h-[80vh] overflow-auto">
              {loading ? (
                <div className="flex items-center justify-center h-40">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </div>
              ) : // summary ? (
              //   <p className="text-muted-foreground">{summary}</p>
              // ) : (
              //   <p className="text-muted-foreground italic">
              //     Enter a YouTube URL and click Generate Summary to see the
              //     results
              //   </p>
              // )
              N8NResponse.response ? (
                <ResponseRenderer
                  title={N8NResponse.title}
                  description={N8NResponse.description}
                  response={N8NResponse.response}
                />
              ) : (
                <p className="text-muted-foreground italic">
                  Enter a YouTube URL and click Generate Summary to see the
                  results
                </p>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
