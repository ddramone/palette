import tinycolor from 'tinycolor2';

export class PickerController {

    constructor($rootScope, colorsService) {

        var vm = this;

        vm.$rootScope = $rootScope;

        vm.colorsService = colorsService;

        vm.combinations = colorsService.getPossibleCombinations();
        vm.active = vm.combinations[0];



        const picker = new CP(document.getElementById('ColorPicker'), false);
        const pickerPosition = document.getElementById('ColorPickerPosition');

        // picker onchange event
        picker.on("change", function (color) {
            const hex = '#' + color;
            this.target.value = hex;
            vm.colorsService.setColor(hex);
            vm.color = tinycolor(hex).setAlpha(0.3).toRgbString();
            $rootScope.$broadcast('colorsChange');
        });

        // add a `static` class to the color picker panel
        picker.picker.classList.add('static');
        picker.set(vm.colorsService.hex);

        // render picker to given element
        picker.enter(pickerPosition);

        window.onresize = function () {
            picker.enter(pickerPosition);
        };

    }

    ifActive(combination) {
        const vm = this;
        return vm.active === combination;
    }

    setCombination(combination) {
        const vm = this;
        vm.active = combination;
        vm.colorsService.setCombination(combination);
    }



}