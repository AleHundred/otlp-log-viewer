import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, addMinutes } from "date-fns";
import { ILogRecord } from "@opentelemetry/otlp-transformer";

/**
 * Merges class names using clsx and tailwind-merge.
 * @param inputs - The class names to merge.
 * @returns The merged class names.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Converts a time in Unix nanoseconds to a JavaScript Date object.
 * @param timeUnixNano - The time in Unix nanoseconds.
 * @returns The corresponding Date object, or null if invalid input.
 */
export const convertTimeUnixNanoToDate = (
  timeUnixNano: number | undefined
): Date | null => {
  if (typeof timeUnixNano !== "number" || isNaN(timeUnixNano)) {
    return null;
  }
  return new Date(timeUnixNano / 1_000_000); // Converts nanoseconds to milliseconds
};

/**
 * Converts a time in Unix nanoseconds to a formatted date string.
 * @param timeUnixNano - The time in Unix nanoseconds.
 * @returns The formatted date string, or an empty string if invalid input.
 */
export const convertTimeUnixNano = (
  timeUnixNano: number | undefined,
  dateFormat: string = "yyyy-MM-dd HH:mm:ss"
): string => {
  const date = convertTimeUnixNanoToDate(timeUnixNano);
  if (!date) {
    return "";
  }
  return format(date, dateFormat); // Use date-fns for formatting
};

/**
 * Gets the severity color based on the severity text.
 * @param severity - The severity text.
 * @param severityColors - The mapping of severity texts to colors.
 * @returns The corresponding color for the severity.
 */
export const getSeverityColor = (
  severity: string | undefined,
  severityColors: { [key: string]: string }
): string => {
  return severity ? severityColors[severity] || "bg-gray-500" : "bg-gray-500";
};

/**
 * Initializes the data object with time intervals.
 * @param startTime - The start time of the logs.
 * @param endTime - The end time of the logs.
 * @param intervalMinutes - The interval in minutes.
 * @returns An object with time intervals as keys and 0 as values.
 */
export const initializeDataIntervals = (
  startTime: Date,
  endTime: Date,
  intervalMinutes: number
): Record<string, number> => {
  const data: Record<string, number> = {};
  for (
    let d = new Date(startTime);
    d <= endTime;
    d.setMinutes(d.getMinutes() + intervalMinutes)
  ) {
    data[format(d, "yyyy-MM-dd HH:mm")] = 0; // Ensure consistent formatting of keys
  }
  return data;
};

/**
 * Processes logs into histogram data (grouped by intervals) and counts by severity.
 * @param logs - Array of log records.
 * @param intervalMinutes - The interval in minutes for grouping logs in the histogram.
 * @returns Histogram data and severity counts.
 */
export const processLogs = (
  logs: ILogRecord[],
  intervalMinutes: number
): {
  histogramData: { time: string; count: number }[];
  severityCounts: Record<string, number>;
} => {
  const histogram: Record<string, number> = {};
  const severityCounts: Record<string, number> = {};

  // Get the min and max timestamps for logs
  const startTime = new Date(
    Math.min(...logs.map((log) => Number(log.timeUnixNano) / 1000000))
  );
  const endTime = new Date(
    Math.max(...logs.map((log) => Number(log.timeUnixNano) / 1000000))
  );

  // Initialize time intervals in the histogram
  let currentTime = new Date(startTime);
  while (currentTime <= endTime) {
    const formattedTime = format(currentTime, "dd/MM/yyyy HH:mm");
    histogram[formattedTime] = 0; // Initialize with 0 counts
    currentTime = addMinutes(currentTime, intervalMinutes); // Move to the next interval
  }

  // Process each log
  logs.forEach((log) => {
    // Convert log time to a readable format
    const logDate = new Date(Number(log.timeUnixNano) / 1000000);
    const key = format(logDate, "dd/MM/yyyy HH:mm");

    // Accumulate counts in the histogram
    if (histogram[key] !== undefined) {
      histogram[key]++;
    } else {
      histogram[key] = 1;
    }

    // Count by severity
    if (log.severityText) {
      if (!severityCounts[log.severityText]) {
        severityCounts[log.severityText] = 0;
      }
      severityCounts[log.severityText]++;
    }
  });

  // Convert the histogram object to an array for the chart
  const histogramData = Object.keys(histogram)
    .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
    .map((key) => ({
      time: key,
      count: histogram[key],
    }));

  return { histogramData, severityCounts };
};
