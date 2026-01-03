- [ ] Pop up UI: Simple list of regex rules that uses can add or removed
- [ ] URL Clipr Function: Takes in a list of rules and a URL and returns a new URL (copied to clipboard)
- [ ] Right Click Context Menu: When right clicking on a URL in the webpage URL Clipr should appear with a copy URL action
- [ ] Keyboard Shortcut: Add keyboard shortcut to copy the URL and run the clipr function
- [ ]

# Notes

## APIs Needed

### Storage
- [chrome.storage](https://developer.chrome.com/docs/extensions/reference/api/storage?__readwiseLocation): Needed to store the users rules 
- [wxt.dev storage](https://wxt.dev/guide/essentials/storage.html): wxt version

### Context Menu
- [chrome.contextMenus](https://developer.chrome.com/docs/extensions/reference/api/contextMenus?__readwiseLocation=): For rightClicking on URL and copying it

### Permission
- [activeTab](https://developer.chrome.com/docs/extensions/develop/concepts/activeTab): To grab current URL
- [contextMenus](https://developer.chrome.com/docs/extensions/reference/api/contextMenus): For right clicking on URL and copying it
