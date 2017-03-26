import './picker.canvas';

import './picker.scss';

import { PickerController } from './picker.controller';

angular.module('pallete')
    .component('plPicker', {
        template: require('./picker.html'),
        controller: ['$rootScope', 'colorsService', PickerController],
        controllerAs: 'vm'
    });