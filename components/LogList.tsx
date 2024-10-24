"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronDown, ChevronRight } from "lucide-react";
import { ILogRecord } from "@opentelemetry/otlp-transformer";
import { useLogProcessing } from "@/components/hooks/useLogProcessing";
import HistogramChart from "@/components/HistogramChart";
import SeverityCount from "@/components/SeverityCount";
import { LogListProps } from "@/lib/types";
import { severityColors } from "@/lib/constants";

/**
 * LogList component displays a list of logs with severity counts and a histogram chart.
 * @param logs
 * @param error
 * @returns
 */
const LogList: React.FC<LogListProps> = ({ logs, error }) => {
  // State to manage expanded rows in the table
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  // State to manage loading state
  const [isLoading, setIsLoading] = useState(true);

  // Custom hook to process logs and generate histogram data and severity counts
  const { histogramData, severityCounts } = useLogProcessing(logs);

  // Calculate start and end dates for the period
  const startDate =
    logs.length > 0
      ? new Date(
          Math.min(...logs.map((log) => Number(log.timeUnixNano) / 1000000))
        )
      : null;
  const endDate =
    logs.length > 0
      ? new Date(
          Math.max(...logs.map((log) => Number(log.timeUnixNano) / 1000000))
        )
      : null;

  // Count the number of errors and fatal logs
  const errorCount = logs.filter((log) => log.severityText === "ERROR").length;
  const fatalCount = logs.filter((log) => log.severityText === "FATAL").length;

  useEffect(() => {
    if (logs.length > 0 || error) {
      setIsLoading(false);
    }
  }, [logs, error]);

  /**
   * Toggles the expansion of a log row.
   * @param id - The ID of the log row to toggle.
   */
  const toggleRow = (id: string) => {
    const newExpandedRows = new Set(expandedRows);
    if (newExpandedRows.has(id)) {
      newExpandedRows.delete(id);
    } else {
      newExpandedRows.add(id);
    }
    setExpandedRows(newExpandedRows);
  };

  // Display an error message if there is an error
  if (error) {
    return (
      <div
        className="bg-red-900 border border-red-600 text-red-100 px-4 py-3 rounded relative"
        role="alert"
      >
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  // Display a loading message if logs are being fetched
  if (isLoading) {
    return (
      <div
        className="bg-blue-900 border border-blue-600 text-blue-100 px-4 py-3 rounded relative"
        role="alert"
      >
        <span className="block sm:inline">Loading logs...</span>
      </div>
    );
  }

  // Display a message if there are no logs available
  if (!logs || logs.length === 0) {
    return (
      <div
        className="bg-yellow-900 border border-yellow-600 text-yellow-100 px-4 py-3 rounded relative"
        role="alert"
      >
        <span className="block sm:inline">No logs available.</span>
      </div>
    );
  }

  return (
    <div className="space-y-2 bg-gray-900 text-gray-100 p-1">
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2">
        {Object.entries(severityCounts).map(([severity, count]) => (
          <SeverityCount
            key={severity}
            severity={severity}
            count={count}
            color={severityColors[severity] || "#374151"}
          />
        ))}
      </div>

      <HistogramChart data={histogramData} />

      {/* A row for info on the number of results and errors */}
      <div className="flex justify-between items-center bg-gray-800 text-gray-100 p-3 rounded-lg">
        <div>
          <p className="text-sm">
            Showing <span className="text-gray-300">{logs.length}</span> results
          </p>
        </div>
        <div>
          <p className="text-sm">
            Errors:&nbsp;<span className="text-red-500">{errorCount}</span>
            ,&nbsp;Fatal:&nbsp;
            <span className="text-red-700">{fatalCount}</span>
          </p>
        </div>
      </div>

      {/* Log table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-gray-700 p-3">
            <TableRow>
              <TableHead className="w-[50px]"></TableHead>
              <TableHead>Severity</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Body</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs
              .sort(
                (logA, logB) =>
                  Number(logA.timeUnixNano) - Number(logB.timeUnixNano)
              )
              .map((log: ILogRecord) => (
                <React.Fragment key={log.timeUnixNano.toString()}>
                  <TableRow
                    className="bg-gray-800 cursor-pointer hover:bg-gray-700"
                    onClick={() => toggleRow(log.timeUnixNano.toString())}
                  >
                    <TableCell>
                      {expandedRows.has(log.timeUnixNano.toString()) ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </TableCell>
                    <TableCell>
                      <span
                        className="px-2 py-1 rounded text-xs"
                        style={{
                          backgroundColor:
                            severityColors[
                              log.severityText as keyof typeof severityColors
                            ] || "#374151",
                        }}
                      >
                        {log.severityText}
                      </span>
                    </TableCell>
                    <TableCell>
                      {new Date(
                        Number(log.timeUnixNano) / 1000000
                      ).toLocaleDateString("en-GB")}
                    </TableCell>
                    <TableCell className="font-mono">
                      {log.body?.stringValue}
                    </TableCell>
                  </TableRow>
                  {expandedRows.has(log.timeUnixNano.toString()) && (
                    <TableRow>
                      <TableCell colSpan={4}>
                        <div className="p-4">
                          <h4 className="font-semibold mb-2">Attributes:</h4>
                          {log.attributes &&
                          Object.keys(log.attributes).length > 0 ? (
                            <pre className="whitespace-pre-wrap text-sm">
                              {JSON.stringify(log.attributes, null, 2)}
                            </pre>
                          ) : (
                            <p className="text-sm text-gray-400">
                              No attributes to show
                            </p>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default LogList;
