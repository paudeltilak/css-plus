# CSS Sovereign Lite

A deliberately small Manifest V3 extension.

The browser does the site matching. There is no global `<all_urls>` content
script and no runtime hostname router.

## Behavior

- CSS-only sites: Chrome injects only the listed CSS.
- Kottke: Chrome injects `replace-css.js` plus `styles/kottke.css`.
- Every other site: the extension does nothing.

## Add a normal CSS-only site

Add another object to `content_scripts` in `manifest.json`:

```json
{
  "matches": [
    "*://example.com/*",
    "*://*.example.com/*"
  ],
  "css": ["styles/example.css"],
  "run_at": "document_start"
}
```

Then create `styles/example.css`.

## Kottke

Kottke is the special case. `replace-css.js` removes author `<style>` elements
and stylesheet `<link>` elements, including ones parsed after the content
script starts. Your own `styles/kottke.css` is injected by Chrome from the
manifest.

## Install

1. Extract the ZIP.
2. Open `chrome://extensions`.
3. Enable Developer mode.
4. Click Load unpacked.
5. Select the extracted `css-sovereign-lite` directory.

After editing files, reload the extension and then reload the target page.
