import Page from './js/Page/index.js';
import Animation from './js/Animation/index.js';

// Create a global instance of the Page class
const page = new Page();

// Initialize the page when the document is ready
document.addEventListener('DOMContentLoaded', _ => {
    page.init();
    const animation = document.querySelector('.js-animation');
    animation && new Animation(animation);
});