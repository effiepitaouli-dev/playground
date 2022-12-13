export default class Page {
    constructor() {
        // Initialize the Page class
    }

    init() {
        // Add a class to the body for detecting mobile or desktop
        document.body.classList.add(window.matchMedia('(hover:none) and (pointer:coarse)').matches ? 'mobile' : 'desktop');
    }
}
