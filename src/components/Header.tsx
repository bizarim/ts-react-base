import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/rootReducer';
import { AppBar, Button, Grid, Toolbar, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { AuthDispatch, authErr } from '../store/moudules/auth';


const useStyles = makeStyles((theme: Theme) => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        justifyContent: 'flex-start',
    },
    headerLeftContainer: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        color: '#ffffff',
    },
    headerRightContainer: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        '& > *': {
            backgroundColor: theme.palette.secondary.main,
            marginLeft: theme.spacing(0.2),
            marginRight: theme.spacing(0.2),
        },
    }
}));

const btnSx = { my: 2, display: 'flex' };

/**
 * Header component
 */
export const Header: React.FunctionComponent = () => {
    const styles = useStyles();
    const { accessToken } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch<AuthDispatch>();
    const logout = React.useCallback((): void => { dispatch(authErr()); }, []);

    let isLoggedIn: boolean = true;
    if (accessToken === undefined || accessToken === null) isLoggedIn = false;
    

    return (
        <AppBar position="static" className={styles.appBar}>
            <Toolbar>
                <Grid container className={styles.headerLeftContainer}>sample</Grid>
                <Grid container className={styles.headerRightContainer}>
                    {!isLoggedIn && <Button variant="contained" href={'/signup'} sx={btnSx}>회원가입</Button>}
                    {!isLoggedIn && <Button variant="contained" href={'signin'} sx={btnSx} >로그인</Button>}
                    {isLoggedIn && <Button variant="contained" sx={btnSx} onClick={logout} >로그아웃</Button>}
                </Grid>
            </Toolbar>
        </AppBar>
    );
};