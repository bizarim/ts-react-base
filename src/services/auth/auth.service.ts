import axios from 'axios';
import { ApiResponse } from '../types';


export const refreshAccessToken = async (baseUrl: string) => {
    const refresh_token = sessionStorage.getItem('refresh_token');
    if (refresh_token) {
        try {
            const response = await axios.post(baseUrl + '/auth/refresh/token', {}, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${refresh_token}`
                }
            });
            const res = response.data as ApiResponse;
            const token = res.data as string;
            sessionStorage.setItem('accessToken', token);
            sessionStorage.setItem('last_action', Date.now().toString());
            return Promise.resolve(token);

        } catch (e) {
            sessionStorage.removeItem('accessToken');
            sessionStorage.removeItem('refresh_token');
            sessionStorage.removeItem('last_action');
            return Promise.reject('');
        }
    }
    return Promise.reject('');
};
