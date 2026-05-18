export function formatDateTimeLocalToBackend(value: string) {
  if (!value) return "";

  return value.replace("T", " ") + ":00";
}
