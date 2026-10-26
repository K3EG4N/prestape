import dayjs from "dayjs";
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

const shortDateFormatter = new Intl.DateTimeFormat(DATE_LOCALE, {
  weekday: "short",
  day: "numeric",
  month: "short",
});

const relativeFormatter = new Intl.RelativeTimeFormat(DATE_LOCALE, {
  numeric: "auto",
});

export const formatShortDate = (value: string | Date): string =>
  shortDateFormatter.format(new Date(value));

export const formatRelative = (value: string | Date): string => {
  const minutes = Math.round((new Date(value).getTime() - Date.now()) / 60000);

  if (Math.abs(minutes) < 60) return relativeFormatter.format(minutes, "minute");
  const hours = Math.round(minutes / 60);
  if (Math.abs(hours) < 24) return relativeFormatter.format(hours, "hour");
  return relativeFormatter.format(Math.round(hours / 24), "day");
};

export const daysUntil = (value: string | Date): number =>
  dayjs(value).startOf("day").diff(dayjs().startOf("day"), "day");

const timeFormatter = new Intl.DateTimeFormat(DATE_LOCALE, {
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

export const formatTime = (value: string | Date): string =>
  timeFormatter.format(new Date(value));
