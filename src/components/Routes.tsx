import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router';
import { SamplePage } from '../pages/Sample';
import { RootState } from '../store';


// eslint-disable-next-line
export const PrivateRoute: React.FunctionComponent<any> = ({ component: CustomComponent, isLoggedIn, ...rest }) => {
    // eslint-disable-next-line
    if (true === isLoggedIn) return <Route {...rest} render={(props: any) => <CustomComponent {...props} />} />;
    return (<Route {...rest}> <Redirect to={'/signin'} /></Route>);
};

// eslint-disable-next-line
export const PublicRoute: React.FunctionComponent<any> = ({ component: CustomComponent, isLoggedIn, ...rest }) => {
    // eslint-disable-next-line
    return <Route {...rest} render={(props: any) => <CustomComponent {...props} />} />;
};

/**
 * Routes componet
 * 여기서 routes 작업 하면 된다.
 */
export const Routes: React.FunctionComponent = () => {
    const { accessToken } = useSelector((state: RootState) => state.auth);
    let isLoggedIn: boolean = true;
    if (accessToken === undefined || accessToken === null) isLoggedIn = false;

    return (
        <Switch>
            <PublicRoute path="/sample" isLoggedIn={isLoggedIn} component={SamplePage} />
            <Route exact={true} path="/" component={SamplePage} />
            <Route component={undefined} />
        </Switch>
    );
};

