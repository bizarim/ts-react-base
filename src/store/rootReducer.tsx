import { combineReducers } from 'redux';
import { I18nState, changeLanguageReducer } from './moudules/public/i18n';
import { ThemeState, changeThemeModeReducer } from './moudules/public/theme';
import { toastReducer, ToastState } from './moudules/public/toast';
// [ Redux 사용법 ] step 5: reducer combine

export interface RootState {
    public: {
        i18n: I18nState;
        theme: ThemeState;
        toasts: ToastState;
    };
}

export const publicReducer = combineReducers({
    theme: changeThemeModeReducer,
    i18n: changeLanguageReducer,
    toasts: toastReducer,
});

export const rootReducer = combineReducers({
    public: publicReducer,
});

