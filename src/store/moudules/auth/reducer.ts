import {
    SIGN_IN_RS, SIGN_IN_ERR,
    SIGN_UP_RS, SIGN_UP_ERR,
    AUTH_ERR, SET_LAST_ACTION,
    REFRESH_TOKEN_RS, REFRESH_TOKEN_ERR
} from './constants';
import { AuthAction, SignInRSAction, SignInErrAction, SignUpErrAction, RefreshTokenRSAction, RefreshTokenErrAction } from './actions';
import { SignInRSPayload, RefreshTokenRSPayload } from './types';
import { CommonErrPayload } from '../../../services/types';

export interface AuthState {
    accessToken: string | null | undefined;
    refresh_token: string | null | undefined;
    last_action?: number;
    signIn: { isCompleted: boolean, err?: string; }
    signUp: { isCompleted: boolean, err?: string; existErr?: string; }
}

export const initAuthState: AuthState = {
    accessToken: 'test',
    refresh_token: sessionStorage.getItem('refresh_token'),
    last_action: sessionStorage.getItem('last_action') === null ? undefined : parseInt(sessionStorage.getItem('last_action') as string),
    signIn: { isCompleted: false, err: undefined },
    signUp: { isCompleted: false, err: undefined },
};

export const authReducer = (state = initAuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case AUTH_ERR: {
            sessionStorage.removeItem('accessToken');
            sessionStorage.removeItem('last_action');
            return {
                accessToken: sessionStorage.getItem('accessToken'),
                refresh_token: sessionStorage.getItem('accessToken'),
                last_action: sessionStorage.getItem('last_action') === null ? undefined : parseInt(sessionStorage.getItem('last_action') as string),
                signIn: { isCompleted: false, err: undefined },
                signUp: { isCompleted: false, err: undefined },
            };
        }
        case SET_LAST_ACTION: {
            const now = Date.now();
            sessionStorage.setItem('last_action', now.toString());
            return { ...state, last_action: now };
        }
        case SIGN_IN_RS: {
            const act = action as SignInRSAction;
            const payload = act.payload as SignInRSPayload;
            sessionStorage.setItem('accessToken', payload.accessToken);
            sessionStorage.setItem('refresh_token', payload.refresh_token);
            const now = Date.now();
            sessionStorage.setItem('last_action', now.toString());
            return { ...state, accessToken: payload.accessToken, refresh_token: payload.refresh_token, last_action: now, signIn: { isCompleted: true, err: undefined } };
        }
        case SIGN_IN_ERR: {
            const act = action as SignInErrAction;
            const payload = act.payload as CommonErrPayload;
            sessionStorage.removeItem('accessToken');
            sessionStorage.removeItem('last_action');
            return { ...state, accessToken: undefined, refresh_token: undefined, signIn: { isCompleted: false, err: payload.msg } };
        }
        case SIGN_UP_RS: {
            return { ...state, signUp: { isCompleted: true, err: undefined, existErr: undefined } };
        }
        case SIGN_UP_ERR: {
            const act = action as SignUpErrAction;
            const payload = act.payload as CommonErrPayload;
            const msg = '회원가입 중 오류가 발생했습니다.' || payload.msg;
            return { ...state, signUp: { isCompleted: false, err: undefined, existErr: msg } };
        }
        case REFRESH_TOKEN_RS: {
            const act = action as RefreshTokenRSAction;
            const payload = act.payload as RefreshTokenRSPayload;
            const now = Date.now();
            sessionStorage.setItem('last_action', now.toString());
            return { ...state, accessToken: payload.accessToken, last_action: now, signIn: { isCompleted: true, err: undefined } };
        }
        case REFRESH_TOKEN_ERR: {
            const act = action as RefreshTokenErrAction;
            const payload = act.payload as CommonErrPayload;
            let msg = payload.msg;
            if (payload.code === '401') { msg = '이미 존재하는 이메일 입니다.'; }
            return { ...state, signUp: { isCompleted: false, err: undefined, existErr: msg } };
        }

        default: {
            return state;
        }
    }
};
