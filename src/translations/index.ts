
import { en } from './en';
import { kr } from './kr';

export type LangType = typeof kr;

export const languageMap: { [lang: string]: LangType } = {
    default: kr,
    kr,
    en,
};
