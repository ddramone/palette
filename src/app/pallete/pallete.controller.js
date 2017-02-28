export class PalleteController {

    constructor($scope, $rootScope, colorsService) {

        var vm = this;
        vm.colors = colorsService.getPallete();

        $rootScope.$on('onColorChange', function () {
            vm.colors = colorsService.getPallete();
            $scope.$apply();
        });


    }


}