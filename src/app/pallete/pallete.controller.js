export class PalleteController {

    constructor(colorsService) {

        var vm = this;
        vm.colors = colorsService.getPallete();


    }


}