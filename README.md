# Getting Started with Create React App

[ Redux 사용법 ]
step 1 : action 정의
파일 src/store/modules/{이름}/constants.ts
``` typescript
    export const CHANGE_TEST_MODE = 'test/CHANGE_TEST_MODE'; 
```

step 2 : action 만들기
파일 src/store/modules/{이름}/actions.ts
``` typescript
    export interface ChangeTestModeAction {
        type: string;
        payload: string;
    }

    export const changeTestmode = (payload: string): ChangeTestModeAction => ({
        type: CHANGE_TEST_MODE,
        payload,
    });
```

step 3 : get set 만들기 - redux가 관리하는 데이터 접근용
파일 src/store/modules/{이름}/gatters.ts
``` typescript
    export const getCurrentTestMode = (state: RootState): TestState['mode'] => {
        const mode = state.public.test.mode;
        return mode;
    };
```

step 4: reducer 만들기 - action에 따른 동작 구현
파일 src/store/modules/{이름}/reducer.ts
``` typescript
    export interface TestState {
        mode: string | 'light' | 'dark';
    }

    const currentMode: string = localStorage.getItem('test-mode') || 'light';

    export const initialTestState: TestState = {
        mode: currentMode
    };

    export const changeTestModeReducer = (state = initialTesttate, action: ChangeTestModeAction) => {
        switch (action.type) {
            case CHANGE_TEST_MODE:
                localStorage.setItem('test-mode', action.payload);
                return {
                    ...state,
                    mode: action.payload,
                };
            default:
                return state;
        }
    };

``` 

step 5: reducer combine
파일 src/store/rootReducer.tsx
``` typescript
    export const rootReducer = combineReducers({
        test: changeTestModeReducer,
    });
``` 

step 6: store 생성 시 rootReducer 등록
파일 src/store/configureStore.ts
``` typescript
    const history = createBrowserHistory();
    const sagaMiddleware = createSagaMiddleware();
    const composeEnhancer: typeof compose = (window as any)
        .__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    export const configureStore = () => {
        const store = createStore(
            rootReducer, 
            composeEnhancer(applyMiddleware(sagaMiddleware, routerMiddleware(history)))
        );
        sagaMiddleware.run(rootSaga);
        return store;
    };

``` 

step 7: store 적용
파일 src/App.tsx
``` typescript
    const store = configureStore();

    ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
        <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
    );
``` 


[ Redux-saga 사용법 ] 
step 1: saga 만들기
파일 src/store/modules/{이름}/saga.ts
``` typescript
    export function* rootTestSaga() {
        yield takeEvery(TEST_PUSH, testSaga);
    }

    function* testSaga(action: TestPush) {
        yield call(callTestData, action);
    }

    function* callTestData(action: TestPush) {
        yield put(TestData(action.payload));
        yield delay(parseFloat(`${2000}`));
        yield put(TestDelete());
    }
```

step 2: 정의한 개별 saga 등록
파일 src/store/rootSaga.tsx
``` typescript
export function* rootSaga() {
    yield all([
         call(rootTestSaga),
    ]);
}
```