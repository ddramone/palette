import './../../vendor/colorpicker/colorpicker.scss';
require('./../../vendor/colorpicker/colorpicker.min.js');

import './picker.scss';

import angular from 'angular';
import { PickerController } from './picker.controller';

angular.module('pallete')
    .component('plPicker', {
        template: require('./picker.html'),
        controller: ['colorsService', PickerController],
        controllerAs: 'vm'
    });