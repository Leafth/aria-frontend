export function maskEarTag(value: string) {
  return value.replace(/\D/g, "");
}

export function maskWeight(value: string) {
  return value
    .replace(",", ".")
    .replace(/[^0-9.]/g, "")
    .replace(/(\..*)\./g, "$1");
}
