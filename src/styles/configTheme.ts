import { createTheme, Theme } from '@mui/material/styles';

export function themeCreator(theme: string): Theme {
    return themeMap[theme];
}

// todo
// theme 별로 파일 분리 
// 현재는 샘플용
const themeMap: { [key: string]: Theme } = {
    'light': createTheme({
        palette: {
            primary: {
                main: '#1976d2',
            },
            secondary: {
                main: '#9c27b0',
            },
            text: {
                primary: 'rgba(0,0,0,0.87)',
                secondary: 'rgba(0,0,0,0.6)',
            },
            background: {
                default: 'red'
            }
        }
    }),
    'dark': createTheme({
        palette: {
            primary: {
                main: '#000'
            },
            secondary: {
                main: '#9c27b0',
            },
            text: {
                primary: 'rgba(0,0,0,0.87)',
                secondary: 'rgba(0,0,0,0.6)',
            },
        }
    })
};