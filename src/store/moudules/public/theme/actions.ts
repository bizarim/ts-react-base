import {
    CHANGE_THEME_MODE,
} from './constants';
// [ Redux 사용법 ] step 2: action 만들기

export interface ChangeThemeModeAction {
    type: string;
    payload: string;
}

export const changeThemeMode = (payload: string): ChangeThemeModeAction => ({
    type: CHANGE_THEME_MODE,
    payload,
});