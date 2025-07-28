const querySelectorAsync = async (selector, parentNode = document) => {
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
