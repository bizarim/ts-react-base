export const CHANGE_LANGUAGE = 'i18n/CHANGE_LANGUAGE';

export interface ChangeLanguageAction {
    type: string;
    payload: string;
}
export const changeLanguage = (payload: string): ChangeLanguageAction => ({
    type: CHANGE_LANGUAGE,
    payload,
});
