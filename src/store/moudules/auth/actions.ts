import { Dispatch } from 'redux';
import { CommonErrPayload } from '../../../services/types';
import {
    SIGN_IN_RQ, SIGN_IN_RS, SIGN_IN_ERR,
    SIGN_UP_RQ, SIGN_UP_RS, SIGN_UP_ERR,
    AUTH_ERR, SET_LAST_ACTION, REFRESH_TOKEN_RQ, REFRESH_TOKEN_RS, REFRESH_TOKEN_ERR,
} from './constants';
import { SignInRQPayload, SignInRSPayload, SignUpRQPayload , RefreshTokenRSPayload} from './types';

export type AuthAction = AuthErrAction | SetLastAction |
    SignInRQAction | SignInRSAction | SignInErrAction |
    SignUpRQAction | SignUpRSAction | SignUpErrAction ;

export type AuthDispatch = Dispatch<AuthAction>;

export interface AuthErrAction { type: string; }
export const authErr = (): AuthErrAction => ({ type: AUTH_ERR });
export interface SetLastAction { type: string; }
export const setLastAction = (): SetLastAction => ({ type: SET_LAST_ACTION });

export interface SignInRQAction { type: string; payload: SignInRQPayload; }
export const signInRQ = (payload: SignInRQPayload): SignInRQAction => ({ type: SIGN_IN_RQ, payload });

export interface SignInRSAction { type: string; payload: SignInRSPayload; }
export const signInRS = (payload: SignInRSPayload): SignInRSAction => ({ type: SIGN_IN_RS, payload });

export interface SignInErrAction { type: string; payload: CommonErrPayload; }
export const signInErr = (payload: CommonErrPayload): SignInErrAction => ({ type: SIGN_IN_ERR, payload });

export interface SignUpRQAction { type: string; payload: SignUpRQPayload; }
export const signUpRQ = (payload: SignUpRQPayload): SignUpRQAction => ({ type: SIGN_UP_RQ, payload });

export interface SignUpRSAction { type: string; }
export const signUpRS = (): SignUpRSAction => ({ type: SIGN_UP_RS });

export interface SignUpErrAction { type: string; payload: CommonErrPayload; }
export const signUpErr = (payload: CommonErrPayload): SignUpErrAction => ({ type: SIGN_UP_ERR, payload });


export interface RefreshTokenRQAction { type: string; }
export const refreshTokenRQ = (): RefreshTokenRQAction => ({ type: REFRESH_TOKEN_RQ });
export interface RefreshTokenRSAction { type: string; payload: RefreshTokenRSPayload; }
export const refreshTokenRS = (payload: RefreshTokenRSPayload): RefreshTokenRSAction => ({ type: REFRESH_TOKEN_RS, payload });
export interface RefreshTokenErrAction { type: string; payload: CommonErrPayload; }
export const refreshTokenErr = (payload: CommonErrPayload): RefreshTokenErrAction => ({ type: REFRESH_TOKEN_ERR, payload });
