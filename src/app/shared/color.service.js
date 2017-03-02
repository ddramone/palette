import angular from 'angular';
import tinycolor from 'tinycolor2';

angular.module('pallete')
    .service('colorsService', [function () {

        let self = this;

        // result pallete colors 
        self.palette = [];

        // default combination
        self.combination = 'analog';

        // hex value, initially its random
        self.hex = tinycolor.random().toHexString();

        /**
         * All possible coloring combinations 
         */
        self.getPossibleCombinations = () => {
            return ['analog', 'mono', 'split', 'triad', 'tetrad'];
        };

        /**
         * Set combination by name
         * @param combination
         */
        self.setCombination = (combination) => {

            self.combination = combination;
            self.setPallete();

        };

        /**
         * Get current color as hex
         */
        self.getColor = () => {
            return self.hex;
        };

        /**
         * Set current color
         * @param hex
         */
        self.setColor = (hex) => {

            if (hex !== self.hex) {
                self.hex = hex;
                self.setPallete();
            }

        };

        /**
         * Set pallete colors into self.pallete result array
         */
        self.setPallete = () => {

            // tinycolor ref for our hex
            const color = tinycolor(self.hex);
            let colors;


            //Walk through color combinations
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


            // clear array by not losing pointer to object
            self.palette.splice(0, self.palette.length);

            colors.map((c) => {
                self.palette.push({
                    c: c.toHexString(), // Actual color, that we're looking for
                    t: tinycolor.mostReadable(c, ['#fff', '#000']).toHexString() // text color, that will be readable
                });

            });



        };

        // initial state
        self.setPallete();
    }]);
