import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Table component renders a responsive table.
 * @param className - Additional class names for styling.
 * @param props - Additional props for the table element.
 * @param ref - Reference to the table element.
 * @returns A React component that renders a table.
 */
const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="w-full overflow-auto">
    <table
      ref={ref}
      className={cn("w-full caption-bottom text-sm", className)}
      {...props}
    />
  </div>
));
Table.displayName = "Table";

/**
 * TableHeader component renders the header section of a table.
 * @param className - Additional class names for styling.
 * @param props - Additional props for the table header element.
 * @param ref - Reference to the table header element.
 * @returns A React component that renders the table header.
 */
const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn("[&_tr]:border-b border-gray-700", className)}
    {...props}
  />
));
TableHeader.displayName = "TableHeader";

/**
 * TableBody component renders the body section of a table.
 * @param className - Additional class names for styling.
 * @param props - Additional props for the table body element.
 * @param ref - Reference to the table body element.
 * @returns A React component that renders the table body.
 */
const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
));
TableBody.displayName = "TableBody";

/**
 * TableFooter component renders the footer section of a table.
 * @param className - Additional class names for styling.
 * @param props - Additional props for the table footer element.
 * @param ref - Reference to the table footer element.
 * @returns A React component that renders the table footer.
 */
const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn("[&_tr]:border-t border-gray-700", className)}
    {...props}
  />
));
TableFooter.displayName = "TableFooter";

/**
 * TableHead component renders a head cell of a table.
 * @param className - Additional class names for styling.
 * @param props - Additional props for the table head cell element.
 * @param ref - Reference to the table head cell element.
 * @returns A React component that renders the table head cell.
 */
const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-12 px-4 text-left align-middle font-medium text-gray-300 [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className
    )}
    {...props}
  />
));
TableHead.displayName = "TableHead";

/**
 * TableRow component renders a row of a table.
 * @param className - Additional class names for styling.
 * @param props - Additional props for the table row element.
 * @param ref - Reference to the table row element.
 * @returns A React component that renders the table row.
 */
const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-b transition-colors hover:bg-gray-800/50 data-[state=selected]:bg-gray-800",
      className
    )}
    {...props}
  />
));
TableRow.displayName = "TableRow";

/**
 * TableCell component renders a cell of a table.
 * @param className - Additional class names for styling.
 * @param props - Additional props for the table cell element.
 * @param ref - Reference to the table cell element.
 * @returns A React component that renders the table cell.
 */
const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)}
    {...props}
  />
));
TableCell.displayName = "TableCell";

/**
 * TableCaption component renders the caption of a table.
 * @param className - Additional class names for styling.
 * @param props - Additional props for the table caption element.
 * @param ref - Reference to the table caption element.
 * @returns A React component that renders the table caption.
 */
const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-gray-400", className)}
    {...props}
  />
));
TableCaption.displayName = "TableCaption";

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};
