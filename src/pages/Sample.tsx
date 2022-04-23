import React from 'react';
import { Header } from '../components/Header';
import Box from '@mui/material/Box';

export const SamplePage: React.FunctionComponent = () => {
    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', width: '100wh', backgroundColor: 'blue', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', backgroundColor: 'white' }}>
                <Header />
            </Box>
            <Box sx={{ flex: 1, display: 'flex', backgroundColor: 'yellow' }}>
                <Box sx={{ display: 'flex', width: 250, backgroundColor: 'green' }}>tab</Box>
                <Box>contents</Box>
            </Box>
        </Box>
    );
};

