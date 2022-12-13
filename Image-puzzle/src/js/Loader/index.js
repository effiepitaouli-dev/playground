class Input {
    constructor(label, name) {
        this.label = label;
        this.name = name;
        this.valid = true;
        this.input = undefined;
    }

    getIsValid() {
        return this.valid;
    }

    getInput() {
        return this.input;
    }

    init() {
        const fieldset = document.createElement('fieldset');

        const label = document.createElement('label');
        label.innerText = this.label;
        label.for = this.name;
        fieldset.append(label);

        const input = document.createElement('input');
        this.input = input;
        input.name = this.name;
        input.type = "number";
        fieldset.append(input);

        //this.hasError();
        return fieldset;
    }

    hasError() {
        this.input?.addEventListener('input', (e) => {
            console.log('input');
        });
    }
}

// The HTML code in initForm and addLoader functions could of course be added directly in index.html
// Just planning ahead in case I want to do it more configurable

export default class Loader {
    constructor() {
        this.parent = document.body;
        this.element = undefined;
        this.form = undefined;
        this.rows = undefined;
        this.columns = undefined;
    }

    async init() {
        this.addLoader();

        return await this.initForm();
    }

    addLoader() {
        this.element = document.createElement('div');
        this.element.classList = 'js-loader visible';

        this.form = document.createElement('form');
        this.form.classList.add('configuration');

        this.element.append(this.form);
        this.parent.prepend(this.element);
    }

    initForm() {
        this.rows = new Input('Number of rows', 'rows').init();
        this.columns = new Input('Number of columns', 'columns').init();
        const rowsInput = this.rows.querySelector('input');
        const columnsInput = this.columns.querySelector('input');

        rowsInput.required = true;
        rowsInput.value = 5;
        columnsInput.required = true;
        columnsInput.value = 5;
        //columnsInput.step = 1;

        rowsInput.addEventListener('change', e => this.limitChange(e.target));
        columnsInput.addEventListener('change', e => this.limitChange(e.target));

        this.form.append(this.columns);
        this.form.append(this.rows);

        return new Promise((resolve, reject) => {
            this.form.addEventListener('keypress', (e) => {
                e.key == 'Enter' && this.closeLoader()
                resolve([rowsInput.value, columnsInput.value]);
            });
        });
    }

    limitChange(e) {
        if (e.value < 1) e.value = 1;
        if (e.value > 10) e.value = 10;
    }

    closeLoader() {
        this.element.classList.remove('visible');
    }

    formValidate() {
        return this.rows?.getIsValid();
    }
}