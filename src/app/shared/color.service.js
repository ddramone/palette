import angular from 'angular';
import tinycolor from 'tinycolor2';

angular.module('pallete')
    .service('colorsService', [function () {

        let self = this;

        self.palette = [];
        self.combination = 'analog';
        self.hex = tinycolor.random().toHexString();


        self.getPossibleCombinations = () => {
            return ['analog', 'mono', 'split', 'triad', 'tetrad'];
        };

        self.setCombination = (combination) => {

            self.combination = combination;
            self.setPallete();

        };

        self.getColor = () => {
            return self.hex;
        };

        self.setColor = (hex) => {

            if (hex !== self.hex) {
                self.hex = hex;
                self.setPallete();
            }

        };

        self.setPallete = () => {

            // tinycolor ref for our hex
            const color = tinycolor(self.hex);
            let colors;


            switch (self.combination) {
                case 'analog':
                case 'analogous':
                    colors = color.analogous();
                    break;
                case 'mono':
                case 'monochromatic':
                    colors = color.monochromatic();
                    break;
                case 'split':
                case 'splitcomplement':
                    colors = color.splitcomplement();
                    break;
                case 'triad':
                    colors = color.triad();
                    break;
                case 'tetrad':
                    colors = color.tetrad();
                    break;

            }



            self.palette.splice(0, self.palette.length);
            colors.map((c) => {
                self.palette.push(c.toHexString());
            });



        };

        self.setPallete();
    }]);
