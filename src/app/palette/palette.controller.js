export class PaletteController {

    constructor($rootScope, $scope, colorsService) {

        var vm = this;
        vm.s = colorsService;
        vm.colors = colorsService.palette;

        $rootScope.$on('colorsChange', () => {
            $scope.$apply(() => {
                vm.colors = colorsService.palette;
            });
        });


    }

    rand(i) {
        return i + Math.random();
    }
}