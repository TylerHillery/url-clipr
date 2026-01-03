import { describe, test, expect } from "vitest";
import { urlClipr} from "@/utils/clipr";

describe.each([
  {
    url: "https://example.com?utm_source=google&utm_medium=cpc&id=123",
    patterns: ["utm"],
    expected: "https://example.com/?id=123",
  },
  {
    url: "https://example.com?fbclid=abc123&ref=twitter&utm_campaign=summer",
    patterns: ["fbclid", "utm"],
    expected: "https://example.com/?ref=twitter",
  },
  {
    url: "https://example.com?param1=value1&param2=value2",
    patterns: ["utm"],
    expected: "https://example.com/?param1=value1&param2=value2",
  },
  {
    url: "https://example.com?utm_source=newsletter",
    patterns: ["utm"],
    expected: "https://example.com/",
  },
  {
    url: "https://example.com",
    patterns: ["utm", "fbclid"],
    expected: "https://example.com/",
  },
  {
    url: "https://example.com?gclid=xyz&msclkid=abc&ref_id=123",
    patterns: ["gclid", "msclkid"],
    expected: "https://example.com/?ref_id=123",
  },
  {
    url: "https://example.com?utm_source=email&id=456#section-1",
    patterns: ["utm"],
    expected: "https://example.com/?id=456#section-1",
  },
  {
    url: "https://example.com?fbclid=test123#top",
    patterns: ["fbclid"],
    expected: "https://example.com/#top",
  },
  {
    url: "https://example.com?param=value#footer",
    patterns: ["utm"],
    expected: "https://example.com/?param=value#footer",
  },
  {
    url: "https://example.com?utm_source=google&name=john%20doe&ref=home",
    patterns: ["utm"],
    expected: "https://example.com/?name=john%20doe&ref=home",
  },
  {
    url: "https://example.com?search=%e2%9c%93&utm_medium=social",
    patterns: ["utm"],
    expected: "https://example.com/?search=%e2%9c%93",
  },
  {
    url: "https://example.com?fbclid=abc&url=https%3a%2f%2ftest.com",
    patterns: ["fbclid"],
    expected: "https://example.com/?url=https%3a%2f%2ftest.com",
  },
  {
    url: "https://example.com?utm_source=email&message=hello%20world#heading",
    patterns: ["utm"],
    expected: "https://example.com/?message=hello%20world#heading",
  },
])(`urlclipr($url, $patterns)`, ({ url, patterns, expected }) => {
  test(`removes query params matching patterns`, () => {
    const result = urlClipr(url, patterns);
    expect(result).toBe(expected);
  });
});
