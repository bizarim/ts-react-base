import {
    CHANGE_THEME_MODE,
} from './constants';
import { ChangeThemeModeAction } from './actions';

// [ Redux 사용법 ] step 4: reducer 만들기

export interface ThemeState {
    mode: string | 'light' | 'dark';
}

const currentMode: string = localStorage.getItem('theme-mode') || 'light';

export const initialThemeState: ThemeState = {
    mode: currentMode
};

export const changeThemeModeReducer = (state = initialThemeState, action: ChangeThemeModeAction) => {
    switch (action.type) {
        case CHANGE_THEME_MODE:
            localStorage.setItem('theme-mode', action.payload);
            return {
                ...state,
                mode: action.payload,
            };
        default:
            return state;
    }
};
