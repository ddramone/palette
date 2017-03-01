import './palette.scss';
import './button/button.directive';

import { PaletteController } from './palette.controller';
import { ButtonDirective } from './button/button.directive';

import angular from 'angular';

angular.module('pallete')
    .component('plPalette', {
        template: require('./palette.html'),
        controller: ['$rootScope', '$scope', 'colorsService', PaletteController],
        controllerAs: 'vm'
    })
    .directive('plButton', ButtonDirective);
