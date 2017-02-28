import './pallete.scss';
import './button/button.directive';

import { PalleteController } from './pallete.controller';
import { ButtonDirective } from './button/button.directive';

import angular from 'angular';

angular.module('pallete')

    .component('plPallete', {
        template: require('./pallete.html'),
        controller: ['$scope', '$rootScope', 'colorsService', PalleteController],
        controllerAs: 'vm'
    })
    .directive('plButton', ButtonDirective);
