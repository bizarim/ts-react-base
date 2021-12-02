import * as actions from './actions';
import {
    changeLanguageReducer,
    initialChangeLanguageState,
} from './reducer';
import { languageMap } from '../../../../translations';

describe('ChangeLanguage reducer', () => {
    it('should handle CHANGE_LANGUAGE', () => {
        
        let expectedState = {
            lang: 'en',
            messages: languageMap.en,
        };
        expect(changeLanguageReducer(initialChangeLanguageState, actions.changeLanguage('en'))).toEqual(expectedState);
        expect(localStorage.getItem('lang_code')).toEqual('en');

        expectedState = {
            lang: 'ko',
            messages: languageMap.ko,
        };
        expect(changeLanguageReducer(initialChangeLanguageState, actions.changeLanguage('ko'))).toEqual(expectedState);
        expect(localStorage.getItem('lang_code')).toEqual('ko');
    });
});
