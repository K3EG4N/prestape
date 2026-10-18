import { DATE_LOCALE } from "@/constants/date";
import type { DateRange } from "@/interfaces/IFilter";

const dateFormatter = new Intl.DateTimeFormat(DATE_LOCALE, {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

export const formatDate = (value: string | Date): string =>
  dateFormatter.format(new Date(value));

export const toInstantRange = (range: DateRange | null) => ({
  from: range?.[0].startOf("day").toISOString(),
  to: range?.[1].add(1, "day").startOf("day").toISOString(),
});
