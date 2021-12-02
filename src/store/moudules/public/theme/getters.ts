import { RootState } from '../../../rootReducer';
import { ThemeState } from './reducer';

// [ Redux 사용법 ] step 3 : get set 만들기
export const toggleThemeMode = (value: string) => {
    const rootElement = document.getElementsByTagName('body')[0];
    if (value === 'light') {
        rootElement && rootElement.classList.add('light-mode');
    } else {
        rootElement && rootElement.classList.remove('light-mode');
    }
};

export const getCurrentThemeMode = (state: RootState): ThemeState['mode'] => {
    const mode = state.public.theme.mode;
    return mode;
};
