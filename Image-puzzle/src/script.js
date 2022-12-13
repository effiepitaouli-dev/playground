import Page from './js/Page/index.js';
import Animation from './js/Animation/index.js';
import Loader from './js/Loader/index.js';

const loader = new Loader();
// Create a global instance of the Page class
const page = new Page();

// Initialize the page when the document is ready
document.addEventListener('DOMContentLoaded', _ => {
    page.init();
    const animation = document.querySelector('.js-animation');
    loader.init().then((resolve) => animation && new Animation(animation, resolve));
});


//document.addEventListener('contextmenu', (e) => e.preventDefault());

document.addEventListener('keydown', (e) => {
    if (
        (!e.ctrlKey && !e.shiftKey) ||
        e.key === "Shift" ||
        e.key === "Control"
    ) {
        return;
    }
    console.log(e.key);
    // Disable F12, Ctrl + Shift + I, Ctrl + Shift + J, Ctrl + U
    if (e.ctrlKey && e.shiftKey && e.key === 'I') e.preventDefault();
});