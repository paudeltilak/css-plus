(() => {
  "use strict";

  const SELECTOR = 'style, link[rel~="stylesheet" i]';

  const removeAuthorCSS = root => {
    if (
      root.nodeType !== Node.ELEMENT_NODE &&
      root.nodeType !== Node.DOCUMENT_NODE
    ) {
      return;
    }

    if (
      root.nodeType === Node.ELEMENT_NODE &&
      root.matches?.(SELECTOR)
    ) {
      root.remove();
      return;
    }

    root
      .querySelectorAll?.(SELECTOR)
      .forEach(node => node.remove());
  };

  // Remove any author CSS already present.
  removeAuthorCSS(document);

  // While the browser is still parsing the document,
  // kill stylesheet/style nodes as they appear.
  const observer = new MutationObserver(mutations => {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        removeAuthorCSS(node);
      }
    }
  });

  observer.observe(document, {
    childList: true,
    subtree: true
  });

  // Once the initial HTML is parsed, stop watching.
  // After this, DevTools changes are left alone.
  document.addEventListener("DOMContentLoaded", () => {
    observer.disconnect();
  });
})();