import { IPayload } from '../../../services/types';


export interface SignInRQPayload extends IPayload {
    username: string;
    password: string;
}

export interface SignInRSPayload extends IPayload {
    accessToken: string;
    refresh_token: string;
}

export interface SignUpRQPayload extends IPayload {
    password: string;
    username: string;
}

export interface RefreshTokenRSPayload extends IPayload {
    accessToken: string;
}
