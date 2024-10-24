"use client";

import React, { useState, useEffect } from "react";
import LogList from "./LogList";
import { getLogs } from "@/lib/api";
import { ILogRecord } from "@opentelemetry/otlp-transformer";

/**
 * LogViewer component fetches and displays logs using the LogList component.
 * @returns A React component that fetches and displays logs.
 */
const LogViewer: React.FC = () => {
  const [logs, setLogs] = useState<ILogRecord[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const logs = await getLogs();
        setLogs(logs);
      } catch (e) {
        setError(
          e instanceof Error ? e.message : "An unexpected error occurred"
        );
      }
    };

    fetchLogs();
  }, []);

  return (
    <div>
      <LogList
        logs={logs}
        error={error}
      />
    </div>
  );
};

export default LogViewer;
