export function getDateTimeLocalFromDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export function getCurrentDateTimeLocal() {
  return getDateTimeLocalFromDate(new Date());
}

export function subtractHoursFromCurrentDateTimeLocal(minutes: number) {
  const date = new Date();
  date.setMinutes(date.getMinutes() - minutes);

  return getDateTimeLocalFromDate(date);
}

export function getCurrentDateLocal() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
