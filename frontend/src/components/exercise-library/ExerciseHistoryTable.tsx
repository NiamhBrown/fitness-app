import React, { useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import type { ExerciseHistoryTableProps, ExerciseLog } from "../../types/types";
import { FormatDate } from "@/util/FormatDate";

const columnHelper = createColumnHelper<{
  date: string;
  sets: ExerciseLog[];
}>();

const ExerciseHistoryTable: React.FC<ExerciseHistoryTableProps> = ({
  logs,
}) => {
  const groupedLogs = useMemo(() => {
    const groupedByDate = logs.reduce(
      (acc, log) => {
        acc[log.date] ??= { date: log.date, sets: [] };
        acc[log.date].sets.push(log);
        return acc;
      },
      {} as Record<string, { date: string; sets: ExerciseLog[] }>,
    );
    return Object.values(groupedByDate);
  }, [logs]);

  const columns = useMemo(
    () => [
      columnHelper.accessor("date", {
        header: "date",
        size: 250,
        cell: (info) => {
          return FormatDate(info.getValue());
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
    ],
    [],
  );

  const table = useReactTable({
    data: groupedLogs,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="bg-secondary text-primary rounded p-4">
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
