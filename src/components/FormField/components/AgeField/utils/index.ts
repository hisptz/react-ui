import { DateTime, Duration } from "luxon";

export function getValues(date: string) {
  if (!date) {
    return {
      years: "",
      months: "",
      days: "",
    };
  }
  const jsDate = DateTime.fromFormat(date, "yyyy-MM-dd");
  const duration = Duration.fromMillis(DateTime.now().diff(jsDate).as("milliseconds")).shiftTo("years", "months", "days");

  return {
    years: Math.round(duration.get("years")),
    months: Math.round(duration.get("months")),
    days: Math.round(duration.get("days")),
  };
}