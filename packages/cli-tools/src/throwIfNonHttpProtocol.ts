/**
 * Check if a string is an http/https url
 */
export default function throwIfNonHttpProtocol(url: string) {
  const _url = new URL(url);

  const urlProtocol = _url.protocol;

  if (!['http:', 'https:'].includes(urlProtocol)) {
    throw new Error('invalid url, missing http/https protocol');
  }
}
