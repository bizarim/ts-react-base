
import { RootState } from '../../../rootReducer';
import { ToastState } from './reducer';

export const getToastsState = (state: RootState): ToastState['toasts'] => state.public.toasts.toasts;
