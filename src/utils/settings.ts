import type { ISettingsBusinessDay } from "@/interfaces/ISettings";

const toMinutes = (time: string) => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

export const getWeeklyHoursSummary = (days: ISettingsBusinessDay[]) => {
  const openDays = days.filter((day) => day.open);
  const minutes = openDays.reduce(
    (total, day) =>
      total + Math.max(toMinutes(day.closesAt) - toMinutes(day.opensAt), 0),
    0,
  );
  const hours = Math.round((minutes / 60) * 10) / 10;

  return `Abierto ${openDays.length} ${openDays.length === 1 ? "día" : "días"} · ${hours} h a la semana`;
};
