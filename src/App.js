import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import theme from 'features/Theme';
import LandingPage from 'features/LandingPage';
import InputPage from 'features/InputPage';
import AssistantPage from 'features/AssistantPage';
import ResultPage from 'features/ResultPage';

const useStyles = makeStyles({
    root: {
        background: 'linear-gradient(90deg, #00C9FF 0%, #92FE9D 100%)',
        height: '100vh',
    },
});

function App() {
    const classes = useStyles();
    window.watsonAssistantChatOptions = {
        integrationID: 'd9007a13-0161-45d7-a7fe-11623cbf0ae7', // The ID of this integration.
        region: 'us-south', // The region your integration is hosted in.
        serviceInstanceID: '8ef0dba1-df05-4676-9e85-d9fde24317e6', // The ID of your service instance.
        onLoad: function (instance) {
            instance.render();
        },
    };
    setTimeout(function () {
        const t = document.createElement('script');
        t.src =
            'https://web-chat.global.assistant.watson.appdomain.cloud/loadWatsonAssistantChat.js';
        document.head.appendChild(t);
    });

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
                    </Switch>
                </div>
            </ThemeProvider>
        </Router>
    );
}

export default App;
