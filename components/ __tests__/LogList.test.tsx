import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import LogList from "../LogList";
import { ILogRecord } from "@opentelemetry/otlp-transformer";

// Mock the recharts library
jest.mock("recharts", () => ({
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  BarChart: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  Bar: () => <div>Bar</div>,
  XAxis: () => <div>XAxis</div>,
  YAxis: () => <div>YAxis</div>,
  CartesianGrid: () => <div>CartesianGrid</div>,
  Tooltip: () => <div>Tooltip</div>,
  LabelList: () => <div>LabelList</div>,
}));

const mockLogs: ILogRecord[] = [
  {
    severityText: "ERROR",
    timeUnixNano: "1625097600000000000",
    body: { stringValue: "Test error log" },
    attributes: {},
  },
  {
    severityText: "INFO",
    timeUnixNano: "1625097700000000000",
    body: { stringValue: "Test info log" },
    attributes: {},
  },
  {
    severityText: "FATAL",
    timeUnixNano: "1625097800000000000",
    body: { stringValue: "Test fatal log" },
    attributes: {},
  },
] as ILogRecord[];

describe("LogList", () => {
  it("renders log entries", () => {
    render(
      <LogList
        logs={mockLogs}
        error={null}
      />
    );

    expect(screen.getByText("Test error log")).toBeInTheDocument();
    expect(screen.getByText("Test info log")).toBeInTheDocument();
    expect(screen.getByText("Test fatal log")).toBeInTheDocument();
  });

  it("expands log entry on click", async () => {
    const user = userEvent.setup();
    render(
      <LogList
        logs={mockLogs}
        error={null}
      />
    );

    await user.click(screen.getByText("Test error log"));
    expect(screen.getByText("Attributes:")).toBeInTheDocument();
  });

  it("displays error message when error prop is provided", () => {
    const errorMessage = "Failed to fetch logs";
    render(
      <LogList
        logs={[]}
        error={errorMessage}
      />
    );

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });
});
