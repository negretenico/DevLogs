export default function format(date: Date) {
  // Example: Format as "MM/DD/YYYY" for US locale
  const formatterUS = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return formatterUS.format(date);
}
