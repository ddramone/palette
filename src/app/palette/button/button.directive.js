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

            /**
             * Set button default state class and message
             */
            vm.setDefaultState = function () {
                $scope.class = 'button--outline';
                $scope.message = 'Copy';
            };

            /**
             * Set button success state class and message
             */
            vm.setSuccessState = function () {
                $scope.class = 'button--success';
                $scope.message = 'Copied';
            };

            /**
             * initial state
             */
            vm.setDefaultState();

            /**
             * Copy to clipboard and set success state
             */
            vm.clipboard = function () {

                clipboard.copyText($scope.color);
                vm.setSuccessState();
            };



        }],
        controllerAs: 'vm'
    };

};
