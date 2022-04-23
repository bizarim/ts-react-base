import React from 'react';
import { IntlProvider } from 'react-intl';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { StyledEngineProvider } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { themeCreator } from '../styles/configTheme';


/**
 * 각종 middleware provier 설정 wrap component
 */
const ProviderWrapper: React.FunctionComponent = (props) => {
    const { i18n, theme } = useSelector((state: RootState) => state.public);
    const selected = themeCreator(theme.mode);
    return (
        <ThemeProvider theme={selected}>
            <StyledEngineProvider injectFirst>
                <CssBaseline />
                <IntlProvider locale={i18n.lang} messages={i18n.messages} key={i18n.lang}>
                    {props.children}
                </IntlProvider>
            </StyledEngineProvider>
        </ThemeProvider>
    );
};

export default ProviderWrapper;