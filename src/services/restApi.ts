import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { refreshAccessToken } from './auth/auth.service';
import { ApiResponse } from './types';

export const restApi = axios.create({
    baseURL: '',
    headers: { 'Content-Type': 'application/json' },
});


const makeAuthHeader = (config: AxiosRequestConfig): AxiosRequestConfig => {
    const token = '';    // todo get at store

    if (token == undefined) return config;
    if (config.headers == undefined) return config;

    // backend 작업에 따라 인증 토큰 설정 다르다.
    config.headers['Authorization'] = 'Bearer ' + token;

    return config;
};

// async await에서 then catch로 변경 변경한 이유는 redux-saga에서 사용하기 위해
const onRefreshToken = async (response: AxiosResponse) => {
    const res = response.data as ApiResponse;

    // backend 구현에 따라 변경해야 한다.
    // code or status
    switch (res.code) {
        case 'expire_token':
            refreshAccessToken('').then(token => {
                console.log(token);
                return restApi(response.config);
            }).catch(e => {
                console.log(e);
                return Promise.reject(response);
            });
    }

    return Promise.reject(response);
};

const onError = async (response: AxiosResponse) => {
    // todo
    // status 에 따른 처리
    // { Success = 0, Undefined = 1, BadRequest = 400, InternalError = 500, UnknownError = 520, ApiError = 600 }
    // 토큰 만료는 status 로 할지 성공처리 후 에러 코드로 할지 backend처리이에 따라 구현한다.
    if (0 != response.status)
        // todo
        return Promise.reject(response);

    // todo
    return Promise.reject(response);
};

// header 연결
restApi.interceptors.request.use(
    makeAuthHeader,
    error => { return Promise.reject(error); }
);

restApi.interceptors.response.use(
    onRefreshToken,
    onError
);