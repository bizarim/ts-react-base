import { languageMap } from '../../../../translations';
import { CHANGE_LANGUAGE, ChangeLanguageAction } from './actions';

export interface I18nState {
    lang: string;
    messages: { [pair: string]: string };
}

const defaultLanguage = {
    code: 'en',
};

const curLang: string = localStorage.getItem('lang_code') || defaultLanguage.code;

export const initialChangeLanguageState: I18nState = {
    lang: curLang,
    messages: languageMap[curLang],
};

export const changeLanguageReducer = (state = initialChangeLanguageState, action: ChangeLanguageAction) => {
    switch (action.type) {
        case CHANGE_LANGUAGE:
            localStorage.setItem('lang_code', action.payload);
            return {
                lang: action.payload,
                messages: languageMap[action.payload],
            };
        default:
            return state;
    }
};
