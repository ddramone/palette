import { module } from './../app.module';
import './picker';

import { PickerController } from './picker.controller';

describe('Picker', () => {
    let $rootScope;
    let makeController;

    beforeEach(inject(_$rootScope_ => {
        $rootScope = _$rootScope_;
        makeController = (injectables) => {
            return new PickerController(injectables);
        };
    }));

    describe('controller', () => {
        it('should have correct title', () => {
            const controller = makeController();
            console.log(controller);
            expect(controller.title).toEqual('Some Title');
        });
    });

});