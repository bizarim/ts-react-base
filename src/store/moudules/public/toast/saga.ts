import { takeEvery, call, put, delay } from 'redux-saga/effects';
import { TOAST_PUSH } from './constants';
import { toastData, toastDelete, ToastPush } from './actions';

// [ Redux-saga 사용법 ] step 1: saga 만들기
// 복수일 경우 폴더로 관리 하자.
export function* rootToastSaga() {
    yield takeEvery(TOAST_PUSH, toastSaga);
}

function* toastSaga(action: ToastPush) {
    yield call(callToastData, action);
}

function* callToastData(action: ToastPush) {
    yield put(toastData(action.payload));
    yield delay(parseFloat(`${2000}`));
    yield put(toastDelete());
}
