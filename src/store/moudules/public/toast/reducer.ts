import {
    TOAST_DATA, TOAST_DELETE, TOAST_DELETE_BY_INDEX, 
    ToastPayload, ToastAction
} from './actions';


export interface ToastState {
    toasts: ToastPayload[];
}

export const initialToastState: ToastState = { toasts: [] };

export const toastReducer = (state = initialToastState, action: ToastAction) => {
    switch (action.type) {
        case TOAST_DATA:
            return {
                toasts: [...state.toasts, action.payload],
            };
        case TOAST_DELETE:
            return {
                toasts: [...state.toasts.slice(1, state.toasts.length)],
            };
        case TOAST_DELETE_BY_INDEX:
            return {
                toasts: [...state.toasts.slice(0, action.index).concat(...state.toasts.slice(action.index + 1))],
            };
        default:
            return state;
    }
};
