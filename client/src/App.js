import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import theme from 'features/Theme';
import LandingPage from 'features/LandingPage';
import InputPage from 'features/InputPage';
import AssistantPage from 'features/AssistantPage';
import ResultPage from 'features/ResultPage';
import RegisterPage from 'features/RegisterPage';

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
                <div className={classes.root}>
                    <Switch>
                        <Route exact path="/" component={LandingPage} />
                        <Route exact path="/input-page" component={InputPage} />
                        <Route
                            exact
                            path="/assistant-page"
                            component={AssistantPage}
                        />
                        <Route
                            exact
                            path="/result-page"
                            component={ResultPage}
                        />
                        <Route
                            exact
                            path="/register-page"
                            component={RegisterPage}
                        />
                    </Switch>
                </div>
            </ThemeProvider>
        </Router>
    );
}

export default App;
