import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '../store/configureStore';
import { PersistGate } from 'redux-persist/integration/react';

// [ Redux 사용법 ] step 5: store 적용
const { store, persistor } = configureStore();

/**
 * store 설정 wrap component
 */
const StoreWrapper: React.FunctionComponent = (props) => {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                {props.children}
            </PersistGate>
        </Provider>
    );
};

export default StoreWrapper;