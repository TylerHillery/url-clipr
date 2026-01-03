export function urlClipr(urlStr: string, patterns: string[]): string {
  const url = new URL(urlStr);

  const raw = url.search.slice(1);

  const params = raw
    .split("&")
    .filter((param) => param !== "")
    .filter((param) => !patterns.some((pattern) => param.startsWith(pattern)));

  return `${url.origin}${url.pathname}${
    params.length ? "?" + params.join("&") : ""
  }${url.hash}`;
}

urlClipr("https://example.com", ["utm", "fbclid"]);
