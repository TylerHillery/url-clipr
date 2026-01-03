import { storage } from "#imports";

export const STORAGE_KEY = "local:exclusionPatterns";
export interface ExclusionPattern {
  id: string;
  pattern: string;
}

export async function loadPatterns(): Promise<ExclusionPattern[]> {
  const patterns = await storage.getItem<ExclusionPattern[]>(STORAGE_KEY);
  return patterns || [];
}

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
