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

    try {
      // Execute clipboard copy in the page context
      await browser.scripting.executeScript({
        target: { tabId: tab.id },
        func: (url) => {
          navigator.clipboard.writeText(url);
        },
        args: [link.linkUrl],
      });
      console.log("Link copied to clipboard");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  });
});
