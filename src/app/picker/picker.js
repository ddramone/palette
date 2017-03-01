import './../../vendor/colorpicker/colorpicker.scss';
import './../../vendor/colorpicker/colorpicker.min.js';

import './picker.scss';

import angular from 'angular';
import { PickerController } from './picker.controller';

angular.module('pallete')
    .component('plPicker', {
        template: require('./picker.html'),
        controller: ['$rootScope', 'colorsService', PickerController],
        controllerAs: 'vm'
    });