export const comboboxStyles = {
  container: "relative flex flex-col gap-1 w-full",

  containerOpen: "z-[9999]",

  label: "text-sm font-medium text-gray-700",

  input:
    "w-full rounded-lg border border-gray-500 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-gray-300 focus:bg-gray-100",

  inputError: "border-red-400 focus:border-red-400",

  dropdown:
  "absolute left-0 bottom-full z-[9999] mb-1 w-full max-h-[132px] overflow-y-auto overscroll-contain rounded-xl border border-gray-200 bg-gray-100 p-2",

  optionsList: "flex flex-col gap-1",

  option:
    "block w-full shrink-0 cursor-pointer rounded-lg px-3 py-2 text-left text-sm text-gray-700 transition hover:bg-gray-100",

  emptyOption:
    "block w-full shrink-0 rounded-lg px-3 py-2 text-sm text-gray-500",

  newOption:
    "block w-full shrink-0 cursor-pointer rounded-lg px-3 py-2 text-left text-sm text-gray-700 transition hover:bg-gray-100",

  divider: "my-2 shrink-0 border-t border-gray-200",

  error: "text-xs text-red-500",
};