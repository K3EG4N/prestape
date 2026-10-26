import type { ICompactTableProps } from "@/interfaces/IDashboard";

const alignmentClasses = {
  start: "text-start",
  center: "text-center",
  end: "text-end",
} as const;

export const CompactTable = <T,>({
  data,
  columns,
  rowKey,
}: ICompactTableProps<T>) => {
  return (
    <table className="w-full table-fixed text-[13px]">
      <thead>
        <tr className="border-b border-stone-100">
          {columns.map((col) => (
            <th
              key={col.key}
              className={`pb-2 text-xs font-normal text-stone-400 ${col.width ?? ""} ${alignmentClasses[col.align ?? "start"]}`}
            >
              {col.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr
            key={rowKey(row)}
            className="border-b border-stone-100 last:border-b-0"
          >
            {columns.map((col) => (
              <td
                key={col.key}
                className={`py-2 text-stone-700 ${col.className ?? ""} ${alignmentClasses[col.align ?? "start"]}`}
              >
                {col.render
                  ? col.render(
                      col.dataIndex ? row[col.dataIndex] : undefined,
                      row,
                      index,
                    )
                  : col.dataIndex && String(row[col.dataIndex] ?? "")}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
