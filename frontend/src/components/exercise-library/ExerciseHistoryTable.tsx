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
  const groupedByDate = logs.reduce(
    (acc, log) => {
      acc[log.date] ??= { date: log.date, sets: [] };
      acc[log.date].sets.push(log);
      return acc;
    },
    {} as Record<string, { date: string; sets: ExerciseLog[] }>,
  );

  const groupedLogs = Object.values(groupedByDate);

  const columnHelper = createColumnHelper<(typeof groupedLogs)[0]>();

  const columns = [
    columnHelper.accessor("date", {
      header: "date",
      size: 250,
      cell: (info) => {
        const rawDate = info.getValue();
        const d = new Date(rawDate);
        return d.toLocaleDateString();
      },
    }),
    columnHelper.accessor("sets", {
      header: "sets",
      size: 999,
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
    <div className="bg-secondary text-primary rounded p-3">
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="text-left"
                  style={{ width: header.column.getSize() }}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
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
                <td key={cell.id} className="pb-2">
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
