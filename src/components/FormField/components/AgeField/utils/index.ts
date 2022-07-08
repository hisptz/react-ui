import { DateTime, Duration } from "luxon";

export function getValues(date: string) {
  if (!date) {
    return {
      years: "",
      months: "",
      days: "",
    };
  }
  const jsDate = DateTime.fromJSDate(new Date(date)).startOf("day");
  return Duration.fromMillis(DateTime.now().startOf("day").diff(jsDate).as("milliseconds")).shiftTo("years", "months", "days").toObject();
}

export function formatDate(date: string) {
  if (!date) {
    return "";
  }
  return DateTime.fromJSDate(new Date(date)).toFormat("yyyy-MM-dd");
}
