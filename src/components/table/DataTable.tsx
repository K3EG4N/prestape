import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Empty, Input, Pagination, Select, Spin } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import type {
  IDataTableColumn,
  IDataTableProps,
} from "@/interfaces/IDataTable";
import { normalize } from "@/utils/string";
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  PAGE_SIZE_OPTIONS,
} from "@/constants/pagination";
import { SEARCH_DEBOUNCE_MS } from "@/constants/table";

const alignmentClasses = {
  start: "text-start",
  center: "text-center",
  end: "text-end",
} as const;

function renderCell<T>(
  col: IDataTableColumn<T>,
  row: T,
  index: number,
): ReactNode {
  const value = col.dataIndex ? row[col.dataIndex] : undefined;
  if (col.render) return col.render(value, row, index);
  return value as ReactNode;
}

export function DataTable<T>({
  data,
  columns,
  rowKey = "key" as keyof T,
  pageSizeOptions = PAGE_SIZE_OPTIONS,
  defaultPageSize = DEFAULT_PAGE_SIZE,
  enableSearch = false,
  searchPlaceholder = "Buscar...",
  leftActions,
  rightActions,
  filters,
  loading = false,
  pagination,
  onSearchChange,
}: IDataTableProps<T>) {
  const [localPage, setLocalPage] = useState(1);
  const [localPageSize, setLocalPageSize] = useState(defaultPageSize);
  const [query, setQuery] = useState("");
  const searchTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const bodyRef = useRef<HTMLDivElement>(null);

  const isServer = !!pagination;
  const isServerSearch = !!onSearchChange;
  useEffect(() => () => clearTimeout(searchTimer.current), []);

  const filtered = useMemo(() => {
    const q = normalize(query.trim());
    if (!enableSearch || isServerSearch || !q) return data;

    const fields = columns.flatMap((c) => (c.dataIndex ? [c.dataIndex] : []));
    return data.filter((row) =>
      fields.some((f) => normalize(row[f]).includes(q)),
    );
  }, [data, columns, query, enableSearch, isServerSearch]);

  const pageSize = pagination?.size ?? localPageSize;
  const total = pagination?.total ?? filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const current = Math.min(pagination?.page ?? localPage, totalPages);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: 0 });
  }, [current, pageSize]);

  const startIndex = (current - 1) * pageSize;

  const rows = useMemo(
    () =>
      isServer ? filtered : filtered.slice(startIndex, startIndex + pageSize),
    [isServer, filtered, startIndex, pageSize],
  );

  const rangeStart = rows.length > 0 ? startIndex + 1 : 0;
  const rangeEnd = startIndex + rows.length;

  const getKey = (row: T, index: number): string | number => {
    const k = typeof rowKey === "function" ? rowKey(row) : row[rowKey];
    return (k as string | number | undefined) ?? index;
  };

  const handlePage = (page: number) => {
    if (pagination) pagination.changePage(page, pageSize);
    else setLocalPage(page);
  };

  const handlePageSize = (size: number) => {
    if (pagination) pagination.changePage(DEFAULT_PAGE, size);
    else {
      setLocalPageSize(size);
      setLocalPage(1);
    }
  };

  const handleSearch = (value: string) => {
    setQuery(value);
    setLocalPage(1);

    if (!onSearchChange) return;

    clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(
      () => onSearchChange(value.trim()),
      SEARCH_DEBOUNCE_MS,
    );
  };

  const showToolbar = !!leftActions || !!rightActions || enableSearch;

  const colgroup = (
    <colgroup>
      {columns.map((col) => (
        <col
          key={col.key}
          className={[col.className, col.width].filter(Boolean).join(" ")}
        />
      ))}
    </colgroup>
  );

  return (
    <div className="flex min-h-0 w-full flex-1 flex-col gap-3">
      {showToolbar && (
        <div className="flex shrink-0 flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">{leftActions}</div>

          <div className="flex flex-wrap items-center justify-end gap-2">
            {enableSearch && (
              <Input
                allowClear
                value={query}
                onChange={(e) => handleSearch(e.target.value)}
                prefix={<SearchOutlined className="text-stone-400" />}
                placeholder={searchPlaceholder}
                aria-label="Buscar en la tabla"
                className="w-65!"
              />
            )}
            {rightActions}
          </div>
        </div>
      )}

      {filters && (
        <div className="flex shrink-0 flex-wrap items-center gap-2">
          {filters}
        </div>
      )}

      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-stone-200 bg-white">
        <div className="overflow-hidden border-b border-stone-200 scrollbar-gutter-stable">
          <table className="w-full table-fixed border-collapse text-left text-sm">
            {colgroup}
            <thead>
              <tr>
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className={`px-5 py-3.5 text-sm font-medium text-stone-700 ${col.className ?? ""} ${col.align ? alignmentClasses[col.align] : ""}`}
                  >
                    {col.title}
                  </th>
                ))}
              </tr>
            </thead>
          </table>
        </div>

        <div className="relative flex min-h-0 flex-1 flex-col">
          {loading && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/60">
              <Spin />
            </div>
          )}
          <div
            ref={bodyRef}
            className="min-h-0 flex-1 overflow-y-auto scrollbar-gutter-stable"
          >
            <table className="w-full table-fixed border-collapse text-left text-sm">
              {colgroup}
              <tbody>
                {rows.length === 0 && !loading ? (
                  <tr>
                    <td colSpan={columns.length} className="px-5 py-10">
                      <Empty
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                        description={query ? "Sin resultados" : "Sin registros"}
                      />
                    </td>
                  </tr>
                ) : (
                  rows.map((row, rowIndex) => (
                    <tr
                      key={getKey(row, rowIndex)}
                      className="border-b border-stone-100 transition-colors last:border-b-0 hover:bg-stone-50"
                    >
                      {columns.map((col) => (
                        <td
                          key={col.key}
                          className={`px-5 py-3 text-stone-800 ${col.className ?? ""} ${col.align ? alignmentClasses[col.align] : ""}`}
                        >
                          {renderCell(col, row, startIndex + rowIndex)}
                        </td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <footer className="grid grid-cols-1 items-center gap-3 border-t border-stone-200 px-5 py-3 text-sm text-stone-500 sm:grid-cols-[1fr_auto_1fr]">
          <p>
            Mostrando{" "}
            <b className="font-semibold text-stone-800">
              {rangeStart} - {rangeEnd}
            </b>{" "}
            de <b className="font-semibold text-stone-800">{total}</b> registros
            {enableSearch &&
              !isServer &&
              total !== data.length &&
              ` (filtrados de ${data.length})`}
          </p>

          <Pagination
            className="flex justify-center"
            current={current}
            pageSize={pageSize}
            total={total}
            showSizeChanger={false}
            onChange={handlePage}
          />

          <div className="flex items-center gap-2 sm:justify-self-end">
            <span>Filas por página</span>
            <Select
              aria-label="Filas por página"
              value={pageSize}
              onChange={handlePageSize}
              options={pageSizeOptions.map((n) => ({ value: n, label: `${n} registros` }))}
              className="w-fit"
            />
          </div>
        </footer>
      </div>
    </div>
  );
}
