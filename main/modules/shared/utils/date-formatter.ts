export default function formatDate(date: string): string {
  const formattedDate = new Date(date);
  return (
    formattedDate.toLocaleString('default', { day: '2-digit' }) +
    '-' +
    formattedDate.toLocaleString('default', { month: 'short' }) +
    '-' +
    formattedDate.getFullYear()
  );
}
