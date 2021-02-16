import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
    },
    chatContainer: {
        display: 'flex',
        height: '100%',
        width: '75%',
        marginTop: '4%',
        borderRadius: '10vh 10vh 0 0',
        boxShadow: '5px 5px 10px 5px #000000',
        background: 'white',
        alignSelf: 'center',
    },
    textField: {
        alignSelf: 'flex-end',
        width: '100%',
        height: '10%',
        padding: '0 1vw',
        fontSize: '2rem',
        borderTop: '2px solid gray',
    },
    enterButton: {
        background: 'blue',
        '&:hover': {
            background: 'blue',
            opacity: '0.5',
        },
    },
    enterIcon: {
        color: 'white',
    },
});

export default useStyles;
