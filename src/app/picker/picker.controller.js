import tinycolor from 'tinycolor2';

export class PickerController {

    constructor($rootScope, colorsService) {

        var vm = this;

        vm.colorsService = colorsService;

        // possible combinations to be shown as buttons
        vm.combinations = colorsService.getPossibleCombinations();

        // currently active combination as string 
        // default: first value from all possibles
        vm.active = vm.combinations[0];


        const picker = new CP(document.getElementById('ColorPicker'), false);
        const pickerPosition = document.getElementById('ColorPickerPosition');

        // picker onchange event
        picker.on("change", function (color) {
            const hex = '#' + color;
            this.target.value = hex;
            vm.colorsService.setColor(hex);
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