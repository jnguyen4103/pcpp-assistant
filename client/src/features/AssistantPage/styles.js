import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
    },
    innerContainer: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '75%',
        marginTop: '4%',
        borderRadius: '10vh 10vh 0 0',
        boxShadow: '5px 5px 10px 5px #000000',
        background: 'white',
        alignSelf: 'center',
        overflow: 'hidden',
    },
    chatContainer: {
        display: 'flex',
        flexDirection: 'column',
        flex: '1',
        margin: '4vh 2vw 0 2vw',
        overflow: 'auto',
    },
    userText: {
        fontSize: '2rem',
        color: 'white',
    },
    responseText: {
        fontSize: '2rem',
    },
    userMessageBubble: {
        background: '#06cbfb',
        width: 'fit-content',
        maxWidth: '60%',
        padding: '2vh 2vw',
        borderRadius: '5vh',
        marginBottom: '2vh',
        alignSelf: 'flex-end',
        marginRight: '1vw',
    },
    systemResponseBubble: {
        background: '#D8D8D8',
        width: 'fit-content',
        maxWidth: '60%',
        padding: '2vh 2vw',
        borderRadius: '5vh',
        marginBottom: '2vh',
    },
    textField: {
        width: '100%',
        height: '10%',
        padding: '0 1vw',
        fontSize: '2rem',
        borderTop: '2px solid gray',
        marginTop: '2vh',
    },
    enterButton: {
        background: 'blue',
        '&:hover': {
            background: 'blue',
            opacity: '0.7',
        },
        '&:active': {
            opacity: '1.0',
        },
    },
    enterIcon: {
        color: 'white',
    },
});

export default useStyles;
