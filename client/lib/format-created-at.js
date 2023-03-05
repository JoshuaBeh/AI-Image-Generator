export default function formatCreatedAt(createdAt) {
  const date = createdAt.replaceAll('-', '/').split('').splice(0, 10).join('');
  return date;
}
