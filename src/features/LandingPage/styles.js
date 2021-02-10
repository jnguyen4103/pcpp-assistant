import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
    },
    innerContainer: {
        display: 'flex',
        flex: '1',
    },
    leftBox: {
        width: '50%',
        paddingLeft: '8rem',
        paddingTop: '8rem',
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
        paddingTop: '3rem',
    },
    optionsContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '60%',
        borderRadius: '5rem 5rem 0 0',
        paddingTop: '3rem',
        background: '#cdffd5',
        justifyContent: 'space-around',
    },
    optionCards: {
        width: '75%',
        textAlign: 'center',
        borderRadius: '2rem',
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
        padding: '4rem',
    },
});

export default useStyles;
