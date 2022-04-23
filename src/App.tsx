import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ErrorWrapper, Toast, } from './components';
import { Routes } from './components/Routes';

const App: React.FunctionComponent = () => {
    return (
        <BrowserRouter >
            <ErrorWrapper>
                <Toast />
                <Routes />
            </ErrorWrapper>
        </BrowserRouter>
    );
};

export default App;