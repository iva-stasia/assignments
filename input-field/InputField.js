class InputField {
    constructor(selector) {
        this.input = document.querySelector(selector);
    }

    get value() {
        return this.input.value;
    }

    set setValue(value) {
        this.input.value = value;
    }

    isEmpty() {
        return this.input.value == '';
    }

    isPhone() {
        const phone = /^((\+38)?||(38)?)([0-9-]{10})$/;
        return phone.test(this.value);
    }
}
