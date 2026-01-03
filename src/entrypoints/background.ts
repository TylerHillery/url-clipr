import { browser } from "#imports";
import { defineBackground } from "#imports";
import { loadPatterns, urlClipr } from "@/utils/clipr";

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

    await clipAndCopy(tab.url, tab.id);
  });

});

async function clipAndCopy(url: string, tabId: number): Promise<void> {
  const patterns = await loadPatterns();
  const cleanedURL = urlClipr(
    url,
    patterns.map((p) => p.pattern)
  );

  try {
    await browser.scripting.executeScript({
      target: { tabId },
      func: (url) => {
        navigator.clipboard.writeText(url);
      },
      args: [cleanedURL],
    });
    console.log("Current tab URL copied to clipboard");
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
}
