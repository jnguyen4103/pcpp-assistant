import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import theme from 'features/Theme';
import LandingPage from 'features/LandingPage';

const useStyles = makeStyles({
    root: {
        background: 'linear-gradient(90deg, #00C9FF 0%, #92FE9D 100%)',
        height: '100vh',
    },
});

function App() {
    const classes = useStyles();

    return (
        <ThemeProvider theme={theme}>
            <Box className={classes.root}>
                <LandingPage />
            </Box>
        </ThemeProvider>
    );
}

export default App;
