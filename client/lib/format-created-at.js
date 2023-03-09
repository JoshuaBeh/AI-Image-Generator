// Takes the timestamp from the data base and formats it
export default function formatCreatedAt(createdAt) {
  return createdAt.replaceAll('-', '/').split('').splice(0, 10).join('');
}
