import { clipboardModule } from 'angular-clipboard';
import './../app.module';

import './color.service';


describe('Color Service', () => {

    let colorsService;

    beforeEach(window.module('pallete'));

    beforeEach(inject(function (_colorsService_) {
        colorsService = _colorsService_;
        colorsService.setColor('black');
    }));




    it('should set correct color', () => {
        colorsService.setColor('green');
        expect(colorsService.getColor()).toEqual('green');
    });

    it('should get correct color', () => {
        colorsService.getColor('black');
    });

    describe('Palette Combinations', () => {

        it('should return correct pallete for red using analog combination', () => {

            let correctPallete = ['#ff0000', '#ff0066', '#ff0033', '#ff0000', '#ff3300', '#ff6600']
            colorsService.setColor('red');
            colorsService.setPallete();

            expect(colorsService.palette).toEqual(correctPallete);
        });

        it('should return correct pallete for yellow using mono combination', () => {

            let correctPallete = ['#ffff00', '#ff9900', '#ffcc00', '#ffff00', '#ccff00', '#99ff00'];
            colorsService.setColor('yellow');
            colorsService.setPallete();

            expect(colorsService.palette).toEqual(correctPallete);
        });

        it('should return correct pallete for green using split combination', () => {
            let correctPallete = ['#008000', '#338000', '#1a8000', '#008000', '#00801a', '#008033'];
            colorsService.setColor('green');
            colorsService.setPallete();

            expect(colorsService.palette).toEqual(correctPallete);
        });

    });

});