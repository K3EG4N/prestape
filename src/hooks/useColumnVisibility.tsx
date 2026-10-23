import { useMemo, useState } from "react";
import { COLUMN_VISIBILITY_KEY_PREFIX } from "@/constants/storage";
import type { IDataTableColumn } from "@/interfaces/IDataTable";

const readHiddenKeys = (storageKey?: string): string[] => {
  if (!storageKey) return [];
  try {
    const raw = localStorage.getItem(COLUMN_VISIBILITY_KEY_PREFIX + storageKey);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed)
      ? parsed.filter((k) => typeof k === "string")
      : [];
  } catch {
    return [];
  }
};

const saveHiddenKeys = (storageKey: string | undefined, keys: string[]) => {
  if (!storageKey) return;
  try {
    localStorage.setItem(
      COLUMN_VISIBILITY_KEY_PREFIX + storageKey,
      JSON.stringify(keys),
    );
  } catch {
    return;
  }
};

export const useColumnVisibility = <T,>(
  columns: IDataTableColumn<T>[],
  storageKey?: string,
) => {
  const [storedKeys, setStoredKeys] = useState(() =>
    readHiddenKeys(storageKey),
  );

  const hiddenKeys = useMemo(
    () =>
      storedKeys.filter((key) =>
        columns.some((col) => col.key === key && col.hideable),
      ),
    [storedKeys, columns],
  );

  const visibleColumns = useMemo(
    () => columns.filter((col) => !hiddenKeys.includes(col.key)),
    [columns, hiddenKeys],
  );

  const update = (keys: string[]) => {
    setStoredKeys(keys);
    saveHiddenKeys(storageKey, keys);
  };

  const toggle = (key: string) => {
    const column = columns.find((col) => col.key === key);
    if (!column?.hideable) return;

    if (hiddenKeys.includes(key)) {
      update(hiddenKeys.filter((k) => k !== key));
      return;
    }

    if (visibleColumns.length <= 1) return;
    update([...hiddenKeys, key]);
  };

  const reset = () => update([]);

  return { visibleColumns, hiddenKeys, toggle, reset };
};
