export const querySelectorAsync = async (selector, parentNode = document) => {
      const element = parentNode.querySelector(selector);
      if (element) return element;
      
      return new Promise((resolve) => {
          const observer = new MutationObserver((_, obs) => {
              const element = parentNode.querySelector(selector);
      
              if (element) {
                  obs.disconnect();
                  resolve(element);
              }
          });
      
          observer.observe(parentNode, { childList: true, subtree: true });
      });
}

export const observeMutation = (selector, callback) => {
  for (const el of document.querySelectorAll(selector)) {
    callback(el);
  }
      
  const observer = new MutationObserver(async (mutationsList, observer) => {
    for (const mutation of mutationsList) {
      if (mutation.type === 'childList') {
        for (const addedNode of mutation.addedNodes) {
          if (addedNode.nodeType === Node.ELEMENT_NODE) {
            const node = addedNode.matches(selector) ? addedNode : addedNode.querySelector(selector);

            if (node) {
              callback(node);
            }
          }
        }
      }
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
}
