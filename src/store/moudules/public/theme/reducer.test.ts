import * as actions from './actions';
import {
    changeThemeModeReducer,
    initialThemeState,
} from './reducer';

describe('Change theme mode reducer', () => {
    it('should handle CHANGE_THEME_MODE', () => {
        let expectedState = {
            mode: 'light'
        };
        expect(changeThemeModeReducer(initialThemeState, actions.changeThemeMode('light'))).toEqual(expectedState);
        expect(localStorage.getItem('theme-mode')).toEqual('light');
        expectedState = {
            mode: 'dark'
        };
        expect(changeThemeModeReducer(initialThemeState, actions.changeThemeMode('dark'))).toEqual(expectedState);
        expect(localStorage.getItem('theme-mode')).toEqual('dark');
    });
});
