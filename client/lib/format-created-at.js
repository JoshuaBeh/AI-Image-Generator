export default function formatCreatedAt(createdAt) {
  return createdAt.replaceAll('-', '/').split('').splice(0, 10).join('');
}
