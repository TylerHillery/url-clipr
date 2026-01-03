import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  srcDir: "src",
  imports: false,
  manifest: {
    name: "URL Clipr",
    permissions: ["storage", "activeTab", "contextMenus", "scripting"],
    commands: {
      "copy-url": {
        suggested_key: {
          default: "Ctrl+Shift+U",
          mac: "Command+Shift+U",
        },
        description: "Copy URLs without unwanted query params",
      },
    },
  },
});
