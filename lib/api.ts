import {
  IExportLogsServiceRequest,
  IResourceLogs,
  ILogRecord,
} from "@opentelemetry/otlp-transformer";

/**
 * Fetches logs from the API or a local file.
 * @returns A promise that resolves to an array of log records.
 * @throws An error if the logs cannot be fetched.
 */
export async function getLogs(): Promise<ILogRecord[]> {
  try {
    // Uncomment the following lines to fetch from the API
    // const res = await fetch("https://take-home-assignment-otlp-logs-api.vercel.app/api/logs")
    // if (!res.ok) {
    //   throw new Error("Failed to fetch logs")
    // }
    // const data: IExportLogsServiceRequest = await res.json()

    // Temporary: Load logs from local file
    const data: IExportLogsServiceRequest = require("../response.json");

    // Extract all log records from all resource logs and scope logs
    const allLogs: ILogRecord[] = (data.resourceLogs ?? [])
      .flatMap((resourceLog: IResourceLogs) =>
        resourceLog.scopeLogs.flatMap((scopeLog) => scopeLog.logRecords)
      )
      .filter((logRecord): logRecord is ILogRecord => logRecord !== undefined);

    return allLogs;
  } catch (error) {
    console.error("Error fetching logs:", error);
    throw error;
  }
}
