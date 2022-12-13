export default class Animation {
    constructor(element, resolve) {
        this._element = element;
        this.items = [];
        this.positions = [];
        [this.rows, this.number] = resolve;
        this.width = undefined;

        this.init();
    }

    init() {
        this._element.style.setProperty('--number', this.number);
        for (let i = 0; i < this.rows * this.number; i++) {
            const item = document.createElement('item');
            item.classList.add('item');
            this.items.push(item);
            this._element.append(item);
        }
        this.getPic();
        this.updateItems();

        window.addEventListener('resize', () => {
            this.updateSizes();
            this.items.forEach((e, i) => {
                const [row, column] = this.positions[i];
                this.updatePosition(e, row, column);
            });
        })
    }

    getPic() {
        const response = fetch('https://source.unsplash.com/random/?portrait/200x200');
        response.then((res) => {
            document.body.style.setProperty('--url', `url("${res.url}")`);
        }).catch((e) => {
            console.log(e.message);
        })
    }

    updateSizes() {
        this.width = this.items[0].clientWidth;
        this._element.style.setProperty('background-size', `${this._element.clientWidth}px auto`);
    }

    updatePosition(e, row, column) {
        e.style.setProperty('background-position', `${column * this.width * (-1)}px ${row * this.width * (-1)}px`);
        e.style.setProperty('--top', `${this.randomInt(-200, 200)}px`);
        e.style.setProperty('--left', `${this.randomInt(-200, 200)}px`);
        e.style.setProperty('--delay', `${this.randomInt(1500, 2500)}ms`);
    }

    updateItems() {
        if (!(this.items?.length % this.number == 0)) return;
        this.updateSizes();
        //console.time('animation');
        this.items.forEach((element, index) => {
            const column = index % this.number;
            const row = Math.floor(index / this.number); // Get the quotient
            this.positions.push([row, column]);
            this.updatePosition(element, row, column);

            setTimeout(() => element.classList.add('animated'), 3000);
        });

        // this._element.addEventListener('transitionend', () => {
        //     console.timeEnd('animation');
        // });
    }

    randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
}