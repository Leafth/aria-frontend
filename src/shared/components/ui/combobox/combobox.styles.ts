export const comboboxStyles = {
  container: "relative flex flex-col gap-1 w-full",

  containerOpen: "z-[9999]",

  inputWrapper: "relative",

  label:
    "absolute left-4 top-2 z-10 text-xs pointer-events-none text-text-primary",

  input:
    "w-full pt-6 pb-1 px-4 rounded-lg border border-gray-400 bg-white text-black text-sm outline-none transition-all focus:border-primary-600 focus:ring-1 focus:ring-primary-200",

  inputError:
    "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200",

  dropdown:
    "absolute left-0 bottom-full z-[9999] mb-1 w-full max-h-[132px] overflow-y-auto overscroll-contain rounded-xl border border-gray-200 bg-gray-100 p-2",

  optionsList: "flex flex-col gap-1",

  option:
    "block w-full shrink-0 cursor-pointer rounded-lg px-3 py-2 text-left text-sm text-gray-700 transition hover:bg-gray-200",

  emptyOption:
    "block w-full shrink-0 rounded-lg px-3 py-2 text-sm text-gray-500",

  newOption:
    "block w-full shrink-0 cursor-pointer rounded-lg px-3 py-2 text-left text-sm text-gray-700 transition hover:bg-gray-200",

  divider: "my-2 shrink-0 border-t border-gray-200",

  errorWrapper: "flex items-center gap-1 text-red-500 text-xs font-medium",

  errorIcon: "w-5 h-5",
};