import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import type { ExerciseHistoryTableProps, ExerciseLog } from "../../types/types";

const ExerciseHistoryTable: React.FC<ExerciseHistoryTableProps> = ({
  logs,
}) => {
  // Group sets by date for display
  const groupedLogs = Object.values(
    logs.reduce(
      (acc: Record<string, { date: string; sets: ExerciseLog[] }>, set) => {
        if (!acc[set.date]) acc[set.date] = { date: set.date, sets: [] };
        acc[set.date].sets.push(set);
        return acc;
      },
      {}
    )
  );

  const columnHelper = createColumnHelper<(typeof groupedLogs)[0]>();

  const columns = [
    columnHelper.accessor("date", {
      header: "Date",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("sets", {
      header: "Sets",
      cell: (info) => {
        const sets = info.getValue();
        return (
          <span>{sets.map((s) => `${s.reps}×${s.weight}kg`).join(", ")}</span>
        );
      },
    }),
  ];

  const table = useReactTable({
    data: groupedLogs,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExerciseHistoryTable;
