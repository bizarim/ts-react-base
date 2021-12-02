import { I18nState } from './reducer';
import { RootState } from '../../../rootReducer';

export const geti18n = (state: RootState): I18nState =>
    state.public.i18n;
