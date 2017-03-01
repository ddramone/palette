import { clipboardModule } from 'angular-clipboard';
import './../app.module';

import './color.service';


describe('Picker', () => {

    let colorsService;

    beforeEach(window.module('pallete'));

    beforeEach(inject(function (_colorsService_) {
        console.log(_colorsService_);
        colorsService = _colorsService_;
    }));


    describe('Color Service', () => {

        it('should set correct color', () => {
            colorsService.setColor('green');
            expect(colorsService.getColor()).toEqual('green');
        });

        it('should return correct pallete for red', () => {

            colorsService.setColor('red');
            expect(
                colorsService.getPallete()
            ).toEqual(["#ff0000", "#ff1919", "#ff3232", "#ff4b4b", "#ff6464", "#ff7d7d"]);
        });
    });

});