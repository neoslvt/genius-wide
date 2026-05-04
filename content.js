const cleanAndHide = () => {
  const selectorsToRemove = [
    "[class*='LyricsEditWeb__Container']", 
    "[class*='Sidebar__Container']",
    "[class*='InreadAd__Container']"
  ];

  selectorsToRemove.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => el.remove());
  });

  if (!document.getElementById('genius-wide-styles')) {
    const style = document.createElement('style');
    style.id = 'genius-wide-styles';
    style.innerHTML = `
      /* Default for small screens */
      #lyrics-root {
        grid-template-columns: none !important;
      }

      /* Desktop / Wide screens (e.g., wider than 1024px) */
      @media (min-width: 1024px) {
        #lyrics-root {
          grid-template-columns: [page-start] 1fr [grid-start header-left-start] 5rem [left-start sidebar-left-start] repeat(2, 5rem) [header-left-end header-right-start] 5rem [center-start] 5rem [sidebar-left-end content-start] repeat(2, 5rem) [left-end right-start] repeat(1, 5rem) [center-end] repeat(3, 5rem) [right-end content-end] 5rem [grid-end header-right-end] 1fr [page-end] !important;
        }
      }
    `;
    document.head.appendChild(style);
  }
};

cleanAndHide();

const observer = new MutationObserver(() => {
  cleanAndHide();
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});

console.log("Genius Wide: Script active and watching for changes.");