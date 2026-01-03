import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  srcDir: "src",
  imports: false,
  manifest: {
    name: "URL Clipr",
    permissions: ["storage", "activeTab", "contextMenus", "clipboardRead", "clipboardWrite"],
  },
});
