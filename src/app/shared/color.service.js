import angular from 'angular';
import tinycolor from 'tinycolor2';

angular.module('pallete')
    .factory('colorsService', ['$rootScope', function ($rootScope) {

        let self = this;
        self.hex = 'black';

        return {
            getColor: () => {
                return self.hex;
            },
            setColor: (hex) => {

                if (hex !== self.hex) {
                    self.hex = hex;
                    $rootScope.$broadcast('onColorChange');
                }

            },
            getPallete: () => {

                // tinycolor ref for our hex
                const color = tinycolor(self.hex);

                // return object with colors
                const ret = [color.toHexString()];

                for (let i = 0; i <= 4; i++) {

                    ret.push(color.brighten().toHexString());

                }

                return ret;

            }
        };
    }]);