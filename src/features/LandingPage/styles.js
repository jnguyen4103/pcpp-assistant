import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    container: {},
    leftGrid: {
        paddingLeft: '8rem',
        background: 'blue',
    },
    welcomeText: {
        color: 'white',
        fontSize: '5rem',
        fontWeight: '700',
    },
    subtext: {
        color: 'gray',
        fontSize: '2rem',
        fontWeight: '700',
    },
    rightGrid: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: 'red',
    },
    optionsContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '50%',
        borderRadius: '5rem',
        paddingTop: '6rem',
        background: '#cdffd5',
    },
    optionCards: {
        width: '75%',
        textAlign: 'center',
        borderRadius: '2rem',
        boxShadow: '10px 10px 5px #000000',
        cursor: 'pointer',
    },
    optionTexts: {
        fontSize: '2rem',
        fontWeight: '700',
        padding: '4rem',
    },
});

export default useStyles;
