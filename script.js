const navLinksElem = document.querySelectorAll('.nav-link');
const windowsPathName = window.location.pathname;

navLinksElem.forEach(navLinkEl => {
    const navLinkPathName = new URL(navLinkEl.href).pathname;

    if (windowsPathName === navLinkPathName || (windowsPathName === './index.html' &&  navLinkPathName === '/')) {
        navLinkEl.classList.add('active');
    }
})