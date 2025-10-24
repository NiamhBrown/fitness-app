export const FormatDate = (rawDate: string) => {
  const d = new Date(rawDate);
  return d.toLocaleDateString();
};
