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
            const nodes = addedNode.matches(selector) ? [addedNode] : []
                  
            for (const node of addedNode.querySelectorAll(selector)) {
                  nodes.push(node)
            }

            for (const node of nodes) {
                  callback(node);
            }
          }
        }
      }
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
}

export const setIntervalImmediate = (fn, ...args) => {
  fn();
  return setInterval(fn, ...args);
}

export const css = (content) => {
      for (const el of document.getElementsByTagName('style')) {
            if (el.innerHTML === content) return;
      }

      const el = document.createElement('style');
      el.innerHTML = content;
      document.head.appendChild(el);
};
