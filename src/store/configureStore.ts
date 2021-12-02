import { createStore, applyMiddleware, compose } from 'redux';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';

// [ Redux 사용법 ] step 6: store 생성 시 rootReducer 등록
// [ Redux-saga 사용법 ] step 3: store 생성 시 rootSaga 등록

import { rootReducer } from './rootReducer';
import { rootSaga } from './rootSaga';

const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();
// const logger = createLogger({ collapsed: true });

// eslint-disable-next-line
const composeEnhancer: typeof compose = (window as any)
    .__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const configureStore = () => {
    const store = createStore(
        rootReducer,
        composeEnhancer(
            applyMiddleware(
                sagaMiddleware,
                routerMiddleware(history),
            ),
        ),
    );

    sagaMiddleware.run(rootSaga);

    return store;
};
