import angular from 'angular';
import tinycolor from 'tinycolor2';

angular.module('pallete')
    .factory('colorsService', function () {

        let self = this;
        self.hex = 'red';

        return {
            getColor: () => {
                return self.hex;
            },
            setColor: (hex) => {
                self.hex = hex;
            },
            getPallete: () => {

                // tinycolor ref for our hex
                const color = tinycolor(self.hex);

                // return object with colors
                const ret = [];

                for (let i = 0; i <= 5; i++) {

                    ret.push(color.brighten().toHexString());

                }

                return ret;

            }
        };
    });