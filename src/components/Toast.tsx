import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FadeIn from 'react-fade-in';
import { RootState } from '../store/rootReducer';
import { toastDeleteByIndex, ToastDispatch } from '../store/moudules/public';
import { Alert } from '@mui/material';


/**
 * Toast Message component
 * 화면에 잠시 보여줄 메시지 
 */
export const Toast: React.FunctionComponent = () => {
    const { toasts } = useSelector((state: RootState) => state.public.toasts);
    const dispatch = useDispatch<ToastDispatch>();

    const cbDelete = React.useCallback((index: number): void => {
        dispatch(toastDeleteByIndex(index));
    }, []);

    return (
        <div className="pg-toasts">
            {toasts.map((item, index) => (
                <FadeIn key={index}>
                    <div onClick={() => cbDelete(index)}>
                        <Alert security={item.type === 'error' ? 'danger' : item.type === 'success' ? 'success' : item.type}>
                            {item.code && ` ${item.code.toString(10)}`}:{item.msg}
                        </Alert>
                    </div>
                </FadeIn>
            ))}

        </div>
    );
};