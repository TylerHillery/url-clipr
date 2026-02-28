import { loadPatterns, urlClipr } from "@/utils/clipr";
import { browser } from "#imports";
import { defineBackground } from "#imports";

export default defineBackground(() => {
  browser.runtime.onInstalled.addListener(async () => {
    browser.contextMenus.create({
      id: "copy-url",
      title: "Copy URL",
      type: "normal",
      contexts: ["link"],
    });
  });

  browser.contextMenus.onClicked.addListener(async (link, tab) => {
    if (!link.linkUrl) {
      console.error("no linkURL");
      return;
    }

    if (!tab?.id) {
      console.error("no tab ID");
      return;
    }

    await clipAndCopy(link.linkUrl, tab.id);
  });

  browser.commands.onCommand.addListener(async (command) => {
    if (command !== "copy-url") {
      return;
    }

    const [tab] = await browser.tabs.query({
      active: true,
      currentWindow: true,
    });

    if (!tab?.url || !tab?.id) {
      console.error("No active tab found");
      return;
    }

    await clipAndCopy(tab.url, tab.id, { showToast: true });
  });
});

async function clipAndCopy(
  url: string,
  tabId: number,
  options?: { showToast?: boolean },
): Promise<void> {
  const patterns = await loadPatterns();
  const cleanedURL = urlClipr(
    url,
    patterns.map((p) => p.pattern),
  );

  try {
    await browser.scripting.executeScript({
      target: { tabId },
      func: async ({ url, showToast }: { url: string; showToast: boolean }) => {
        await navigator.clipboard.writeText(url);

        if (!showToast) {
          return;
        }

        const existing = document.getElementById("url-clipr-toast");
        existing?.remove();

        const toast = document.createElement("div");
        toast.id = "url-clipr-toast";
        toast.textContent = "URL copied";
        toast.style.position = "fixed";
        toast.style.top = "16px";
        toast.style.right = "16px";
        toast.style.zIndex = "2147483647";
        toast.style.padding = "10px 14px";
        toast.style.borderRadius = "8px";
        toast.style.background = "rgba(17, 24, 39, 0.95)";
        toast.style.color = "#ffffff";
        toast.style.fontFamily =
          "system-ui, -apple-system, Segoe UI, sans-serif";
        toast.style.fontSize = "13px";
        toast.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.25)";
        toast.style.opacity = "0";
        toast.style.transition = "opacity 120ms ease";

        document.body.appendChild(toast);
        requestAnimationFrame(() => {
          toast.style.opacity = "1";
        });

        setTimeout(() => {
          toast.style.opacity = "0";
          setTimeout(() => toast.remove(), 150);
        }, 1200);
      },
      args: [{ url: cleanedURL, showToast: Boolean(options?.showToast) }],
    });
    console.log("Current tab URL copied to clipboard");
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
}
