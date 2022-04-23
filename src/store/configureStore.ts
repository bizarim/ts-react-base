import { createStore, applyMiddleware, compose } from 'redux';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'react-router-redux';
import persistStore from 'redux-persist/es/persistStore';

// [ Redux 사용법 ] step 4: store 생성 시 rootReducer 등록

import persistReducer from './rootReducer';

const history = createBrowserHistory();
// const logger = createLogger({ collapsed: true });

// eslint-disable-next-line
const composeEnhancer: typeof compose = (window as any)
    .__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/**
 * store 생성 및 설정
 *   - store
 *   - persist: react 새로고침 시 state cashing
 * @returns 
 */
export const configureStore = () => {
    const store = createStore(
        persistReducer,
        composeEnhancer(
            applyMiddleware(
                routerMiddleware(history),
            ),
        ),
    );
    const persistor = persistStore(store);

    return { store, persistor };
};
