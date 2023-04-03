function InputField(selector) {
    this.input = document.querySelector(selector);
    this.value = this.input.value;
}

InputField.prototype.setValue = function (value) {
    this.input.value = value;
    this.value = value;
};

InputField.prototype.isEmpty = function () {
    return this.input.value == '';
};

InputField.prototype.isPhone = function () {
    const phone = /^((\+38)?||(38)?)([0-9-]{10})$/;
    return phone.test(this.value);
};
