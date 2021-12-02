import { all, call } from 'redux-saga/effects';
import { rootToastSaga } from './moudules/public/toast/saga';


// [ Redux-saga 사용법 ] step 2: 정의한 개별 saga 등록

// tslint:disable-next-line:no-default-export
export function* rootSaga() {
    yield all([
         call(rootToastSaga),
    ]);
}
