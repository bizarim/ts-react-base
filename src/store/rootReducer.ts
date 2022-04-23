import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import { I18nState, changeLanguageReducer, ChangeLanguageAction } from './moudules/public/i18n';
import { ThemeState, changeThemeModeReducer, ChangeThemeModeAction } from './moudules/public/theme';
import { toastReducer, ToastState, ToastAction } from './moudules/public/toast';
import { persistReducer } from 'redux-persist';
import { AuthAction, authReducer, AuthState } from './moudules/auth';


export interface RootState {
    public: {
        i18n: I18nState;
        theme: ThemeState;
        toasts: ToastState;
    };
    auth: AuthState;
}

export type RootAction =
    ToastAction |
    ChangeLanguageAction |
    ChangeThemeModeAction |
    AuthAction;

// [ Redux 사용법 ] step 3: reducer combine
export const publicReducer = combineReducers({
    theme: changeThemeModeReducer,
    i18n: changeLanguageReducer,
    toasts: toastReducer,
});


export const rootReducer = combineReducers({
    public: publicReducer,
    auth: authReducer,
});

// const persistReducer();
export default persistReducer({
    key: 'root',
    storage,
    whitelist: [
        // todo 
        // 적용하고 싶은 reducer 추가
    ],
    blacklist: [
        // 혹은 사용하고 싶지 않은 reducer 추가
    ]
}, rootReducer);