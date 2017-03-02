export class PaletteController {

    constructor($rootScope, $scope, colorsService) {

        var vm = this;

        // palette reference from shared service 
        vm.colors = colorsService.palette;

        /**
         * Catch event that color is changed and trigger changes to pallete
         */
        $rootScope.$on('colorsChange', () => {
            $scope.$apply(() => {
                vm.colors = colorsService.palette;
            });
        });


    }

}