export class PickerController {

    constructor(colorService) {

        var vm = this;

        var picker = new CP(document.getElementById('ColorPicker'), false);
        var pickerPosition = document.getElementById('ColorPickerPosition');

        // picker onchange event
        picker.on("change", function (color) {
            this.target.value = '#' + color;
            colorService.setColor(this.target.value);
        });

        // add a `static` class to the color picker panel
        picker.picker.classList.add('static');
        picker.set('#000000');

        // render picker to given element
        picker.enter(pickerPosition);

        window.onresize = function () {
            picker.enter(pickerPosition);
        };
    }

}