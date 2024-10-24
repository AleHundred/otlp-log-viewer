import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";

interface HistogramChartProps {
  data: { time: string; count: number }[];
}

/**
 * HistogramChart component renders a bar chart for log distribution.
 * @param data - The histogram data.
 * @returns A React component that renders the histogram chart.
 */
const HistogramChart: React.FC<HistogramChartProps> = ({ data }) => (
  <div className="h-80 md:h-96 bg-gray-800 p-4 rounded-lg">
    <h2 className="text-lg font-medium mb-4 flex items-center">
      Log Distribution (Histogram)
    </h2>
    <ResponsiveContainer
      width="100%"
      height="100%"
    >
      <BarChart
        data={data}
        margin={{ top: 20, right: 5, left: 5, bottom: 30 }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="#4B5563"
        />
        <XAxis
          dataKey="time"
          stroke="#9CA3AF"
          tickFormatter={(value) => value} // Show the full date
          interval={Math.ceil(data.length / 10)} // Show about 10 ticks
        />
        <YAxis stroke="#9CA3AF" />
        <Tooltip
          contentStyle={{
            backgroundColor: "#1F2937",
            border: "none",
            color: "#F3F4F6",
          }}
          labelFormatter={(value) => `Date: ${value}`}
        />
        <Bar
          dataKey="count"
          fill="#60A5FA"
          minPointSize={5}
        >
          <LabelList
            dataKey="count"
            position="top"
            fill="#F3F4F6"
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export default HistogramChart;
