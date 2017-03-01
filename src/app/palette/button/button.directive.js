import './button.scss';

import angular from 'angular';



export function ButtonDirective() {


    return {
        template: require('./button.html'),
        scope: {
            color: '=color'
        },
        controller: ['$scope', 'clipboard', function ($scope, clipboard) {

            const vm = this;

            vm.setDefaultState = function () {
                $scope.class = 'button--outline';
                $scope.message = 'Copy';
            };

            vm.setSuccessState = function () {
                $scope.class = 'button--success';
                $scope.message = 'Copied';
            };

            vm.setDefaultState();

            vm.clipboard = function () {

                clipboard.copyText($scope.color);
                vm.setSuccessState();
            };



        }],
        controllerAs: 'vm'
    };

};
