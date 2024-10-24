import { Suspense } from "react";
import LogViewer from "@/components/LogViewer";
import { Telescope } from "lucide-react";

/**
 * Home component renders the main page with a header and a log viewer.
 * @returns A React component that renders the main page.
 */
export default function Home() {
  return (
    <div className="min-h-screen bg-black-100 text-gray-100">
      <header className="w-full bg-gray-800 p-4">
        <div className="container mx-auto flex items-center">
          <Telescope className="w-7 h-7 text-gray-300 mr-4" />
          <h1 className="text-xl font-medium text-gray-300 font-mono">
            OTLP Log Viewer
          </h1>
        </div>
      </header>
      <main className="container mx-auto p-2 ">
        <Suspense
          fallback={<p className="text-gray-300 text-xl">Loading logs...</p>}
        >
          <LogViewer />
        </Suspense>
      </main>
    </div>
  );
}
