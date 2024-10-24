import { ILogRecord } from "@opentelemetry/otlp-transformer";

/**
 * Props for the LogList component.
 */
export interface LogListProps {
  logs: ILogRecord[];
  error: string | null;
}

/**
 * Props for the SeverityCount component.
 */
export interface SeverityCountProps {
  severity: string;
  count: number;
  color: string;
}

/**
 * Props for the HistogramChart component.
 */
export interface HistogramChartProps {
  data: { time: string; count: number }[];
}
