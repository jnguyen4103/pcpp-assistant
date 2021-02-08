import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import theme from 'features/Theme';
import LandingPage from 'features/LandingPage';
import InputPage from 'features/InputPage';
import AssistantPage from 'features/AssistantPage';

const useStyles = makeStyles({
    root: {
        background: 'linear-gradient(90deg, #00C9FF 0%, #92FE9D 100%)',
        height: '100vh',
    },
});

function App() {
    const classes = useStyles();

    return (
        <Router>
            <ThemeProvider theme={theme}>
                <Box className={classes.root}>
                    <Switch>
                        <Route exact path="/" component={LandingPage} />
                        <Route exact path="/input-page" component={InputPage} />
                        <Route
                            exact
                            path="/assistant-page"
                            component={AssistantPage}
                        />
                    </Switch>
                </Box>
            </ThemeProvider>
        </Router>
    );
}

export default App;
