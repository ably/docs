/*
  This function introduces click listeners to override the functionality for each menu item in the sidebar.
  Sadly, this is necessary because Redoc opens the wrong menu item when clicking on a menu trigger.
*/
export const overrideMenuItemNavigation = () => {
  const menuItems = document.querySelectorAll('#redoc-container .menu-content .scrollbar-container > ul > li');

  menuItems.forEach((targetItem) => {
    targetItem.addEventListener('click', () => {
      menuItems.forEach((item) => {
        const isOther = item !== targetItem;
        const ul = item.querySelector('ul');
        const svg = item.querySelector('svg');

        if (ul) {
          ul.style.display = isOther ? 'none' : 'block';
        }
        if (svg) {
          svg.style.transform = isOther ? 'rotate(-90deg)' : 'rotate(0deg)';
        }
      });
    });
  });
};
