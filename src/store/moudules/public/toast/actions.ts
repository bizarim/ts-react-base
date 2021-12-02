import {
    TOAST_DATA,
    TOAST_DELETE,
    TOAST_DELETE_BY_INDEX,
    TOAST_PUSH,
} from './constants';

export interface ToastPayload {
    type: string;
    code: number;
    msg: string;
}

export interface ToastPush {
    type: typeof TOAST_PUSH;
    payload: ToastPayload;
}

export interface ToastData {
    type: typeof TOAST_DATA;
    payload: ToastPayload;
}

export interface ToastDelete {
    type: typeof TOAST_DELETE;
}

export interface ToastDeleteByIndex {
    type: typeof TOAST_DELETE_BY_INDEX;
    index: number;
}

export type ToastAction =
    ToastPush
    | ToastData
    | ToastDelete
    | ToastDeleteByIndex;

export const toastPush = (payload: ToastPush['payload']): ToastPush => ({
    type: TOAST_PUSH,
    payload,
});

export const toastData = (payload: ToastData['payload']): ToastData => ({
    type: TOAST_DATA,
    payload,
});

export const toastDelete = (): ToastDelete => ({
    type: TOAST_DELETE,
});

export const toastDeleteByIndex = (index: number): ToastDeleteByIndex => ({
    type: TOAST_DELETE_BY_INDEX,
    index,
});
