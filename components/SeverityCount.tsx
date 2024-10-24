import React from "react";

interface SeverityCountProps {
  severity: string;
  count: number;
  color: string;
}

/**
 * SeverityCount component displays a count of logs for a specific severity.
 * @param severity - The severity level.
 * @param count - The count of logs for the severity.
 * @param color - The background color for the severity.
 * @returns A React component that displays the severity count.
 */
const SeverityCount: React.FC<SeverityCountProps> = ({
  severity,
  count,
  color,
}) => {
  return (
    <div
      className="p-2 rounded-lg text-center"
      style={{ backgroundColor: color }}
    >
      <h3 className="text-xs font-semibold">{severity}</h3>
      <p className="text-sm font-semibold">{count}</p>
    </div>
  );
};

export default SeverityCount;
