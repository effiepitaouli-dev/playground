export default class Animation {
    constructor(element) {
        this._element = element;
        this.items = element.querySelectorAll('.item');
        this.number = undefined;

        this.init();
    }

    init() {
        this.number = parseInt(getComputedStyle(this._element).getPropertyValue('--number'));

        this.getPic();
        this.updateItems();
    }

    getPic() {
        const response = fetch('https://source.unsplash.com/random/?portrait/200x200');
        response.then((res) => {
            document.body.style.setProperty('--url', `url("${res.url}")`);
        }).catch((e) => {
            console.log(e.message);
        })
    }
    updateItems() {
        if (!(this.items?.length % this.number == 0)) return;
        //const totalWidth = this._element.clientWidth;
        const width = this.items[0].clientWidth;

        this.items.forEach((element, index) => {
            const column = index % this.number;
            const row = Math.floor(index / this.number); // Get the quotient
            //const totalRows = this.items?.length / this.number;

            element.style.setProperty('--column', column);
            element.style.setProperty('--row', row);
            element.style.setProperty('background-position', `${column * width * (-1)}px ${row * width * (-1)}px`);
            element.style.setProperty('background-size', `${this._element.clientWidth}px auto`);
            element.style.setProperty('--top', `${this.randomInt(-100, 100)}px`);
            element.style.setProperty('--left', `${this.randomInt(-100, 100)}px`);
            element.style.setProperty('--animationDelay', `${this.randomInt(150, 350)}ms`);
            element.classList.add('animated');

            element.querySelector('span').addEventListener('animationend', element => {
                console.log('In animationEnd');
                element.style.setProperty('--top', 0);
                element.style.setProperty('--left', 0);
            })
        });
    }

    randomInt(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
}