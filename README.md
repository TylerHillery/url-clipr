<h1 align="center">
    <span style="vertical-align: middle;">URL Clipr</span>
    <img src="./public/icon/32.png" alt="urlclipr" style="vertical-align: middle;">

[![license](https://img.shields.io/github/license/tylerhillery/url-clipr.svg)](https://github.com/tylerhillery/url-clipr/blob/main/LICENSE)

</h1>

## Overview

A simple browser extension that copies URLs without unwanted query parameters

## Resources

### Storage

- [chrome.storage](https://developer.chrome.com/docs/extensions/reference/api/storage?__readwiseLocation): Needed to store the users rules
- [wxt.dev storage](https://wxt.dev/guide/essentials/storage.html): wxt version

### Context Menu

- [chrome.contextMenus](https://developer.chrome.com/docs/extensions/reference/api/contextMenus?__readwiseLocation=): For rightClicking on URL and copying it

### Permission

- [activeTab](https://developer.chrome.com/docs/extensions/develop/concepts/activeTab): To grab current URL
- [contextMenus](https://developer.chrome.com/docs/extensions/reference/api/contextMenus): For right clicking on URL and copying it
