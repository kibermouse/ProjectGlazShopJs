const tabs = (headerSelector, tabSelector, contentSelector, activeClass, display = 'block') => {
    const header = document.querySelector(headerSelector),
        tab = document.querySelectorAll(tabSelector),
        content = document.querySelectorAll(contentSelector);



    function hideTabContent() {
        content.forEach(item => {
            item.style.display = 'none';
        });
        tab.forEach(item => {
            item.classList.remove(activeClass);
        });
    }

    function showTabContent(i = 0) {
        content[i].style.display = display;
        tab[i].classList.add(activeClass);
    }

    hideTabContent();
    showTabContent();

    header.addEventListener('click', event => {
        const target = event.target;
        if (!target.closest(tabSelector)) {
            return;
        }

        tab.forEach((item, i) => {
            if (target.closest(tabSelector) == item) {
                hideTabContent();
                showTabContent(i);
            }
        });
    });
};

export default tabs;