import type { Metadata } from "next";

/**
 * Metadata for the OTLP Log Viewer application.
 */
export const metadata: Metadata = {
  title: "OTLP Log Viewer",
  description: "A simple log viewer for OTLP logs",
};

/**
 * Mapping of severity levels to their corresponding colors.
 */
export const severityColors: Record<string, string> = {
  ERROR: "#EF4444",
  WARN: "#ca9500",
  DEBUG: "#3B82F6",
  INFO: "#10B981",
  TRACE: "#006079",
  UNSPECIFIED: "#400f8d",
  FATAL: "#492506",
};
