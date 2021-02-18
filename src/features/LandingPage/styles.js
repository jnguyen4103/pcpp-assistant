import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
    },
    innerContainer: {
        height: '100%',
        display: 'flex',
        flex: '1',
    },
    leftBox: {
        width: '50%',
        paddingLeft: '8vw',
        paddingTop: '16vh',
    },
    welcomeText: {
        color: 'white',
        fontSize: '6rem',
        fontWeight: '700',
    },
    subtext: {
        color: 'gray',
        fontSize: '2rem',
        fontWeight: '700',
    },
    rightBox: {
        display: 'flex',
        width: '50%',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: '4vh',
    },
    optionsContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '60%',
        borderRadius: '10vh 10vh 0 0',
        paddingTop: '8vh',
        background: '#cdffd5',
        justifyContent: 'space-around',
    },
    optionCards: {
        width: '75%',
        textAlign: 'center',
        borderRadius: '5vh',
        boxShadow: '10px 10px 5px #000000',
        '&:link': {
            textDecoration: 'none',
        },
        '&:hover': {
            opacity: '0.7',
            boxShadow: '0px 0px 0px #cdffd5',
        },
    },
    optionTexts: {
        fontSize: '2.5rem',
        fontWeight: '700',
        padding: '6vh 4vw',
    },
});

export default useStyles;
