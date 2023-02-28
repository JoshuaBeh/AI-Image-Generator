export default function parseRoute(hashRoute) {
  if (hashRoute.startsWith('#')) {
    hashRoute = hashRoute.replace('#', '');
  }
  const [path, queryString] = hashRoute.split('?');
  // eslint-disable-next-line no-console
  console.log(JSON.stringify(path), JSON.stringify(queryString));
  const params = new URLSearchParams(queryString);
  return { path, params };
}
