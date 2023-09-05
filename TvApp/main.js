const sidenavItems = document.querySelectorAll('.sidenav-item');

sidenavItems.forEach(item => {
    item.addEventListener('click', () => {
        // Remove the 'active' class from all items
        sidenavItems.forEach(item => {
            item.classList.remove('active');
        });

        // Add the 'active' class to the clicked item
        item.classList.add('active');
    });
});
