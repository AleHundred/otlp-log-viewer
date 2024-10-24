import { useState, useEffect } from "react";
import { ILogRecord } from "@opentelemetry/otlp-transformer";

/**
 * Hook for processing logs and generating histogram data and severity counts.
 * @param logs - The array of log records.
 * @returns An object containing histogram data and severity counts.
 */
export const useLogProcessing = (logs: ILogRecord[]) => {
  const [histogramData, setHistogramData] = useState<
    { time: string; count: number }[]
  >([]);
  const [severityCounts, setSeverityCounts] = useState<Record<string, number>>(
    {}
  );

  useEffect(() => {
    if (!logs || logs.length === 0) return;

    const counts: Record<string, number> = {};

    // Find the start and end times from the logs
    const startDate = new Date(
      Math.min(...logs.map((log) => Number(log.timeUnixNano) / 1000000))
    );
    const endDate = new Date(
      Math.max(...logs.map((log) => Number(log.timeUnixNano) / 1000000))
    );

    // Ensure the last day is included by setting its time to midnight
    endDate.setHours(23, 59, 59, 999); // Set the endDate to the end of the day

    // Function to get all days in the range
    const getAllDatesInRange = (start: Date, end: Date): string[] => {
      const dateArray = [];
      let currentDate = new Date(start);

      while (currentDate <= end) {
        // Format date as dd/mm/yyyy
        dateArray.push(
          currentDate.toLocaleDateString("en-GB") // 'en-GB' formats as dd/mm/yyyy
        );
        currentDate.setDate(currentDate.getDate() + 1);
      }
      return dateArray;
    };

    // Get an array of all days in the range
    const allDays = getAllDatesInRange(startDate, endDate);

    // Initialize data with all days set to 0 counts
    const data = allDays.reduce((acc, date) => {
      acc[date] = 0; // Initialize each day with zero
      return acc;
    }, {} as Record<string, number>);

    // Count logs per day
    logs.forEach((log) => {
      const logDate = new Date(
        Number(log.timeUnixNano) / 1000000
      ).toLocaleDateString("en-GB"); // Format date as dd/mm/yyyy
      if (data[logDate] !== undefined) {
        data[logDate]++;
      }

      if (log.severityText && !counts[log.severityText]) {
        counts[log.severityText] = 0;
      }
      if (log.severityText) {
        counts[log.severityText]++;
      }
    });

    // Prepare the histogram data, showing null for days with zero logs
    const histogramArray = allDays.map((day) => ({
      time: day,
      count: data[day] === 0 ? 0 : data[day], // Keep empty days but set count as 0
    }));

    setHistogramData(histogramArray);
    setSeverityCounts(counts);
  }, [logs]);

  return { histogramData, severityCounts };
};
