// [ Redux 사용법 ] step 1 : action 정의
export const CHANGE_THEME_MODE = 'theme/CHANGE_THEME_MODE';

export interface ChangeThemeModeAction { type: string; payload: string; }

export const changeThemeMode = (payload: string): ChangeThemeModeAction => ({
    type: CHANGE_THEME_MODE,
    payload,
});