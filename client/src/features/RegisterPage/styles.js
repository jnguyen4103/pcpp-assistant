import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
    },
    innerContainer: {
        width: '50%',
        display: 'flex',
        flex: '1',
        flexDirection: 'row',
        alignSelf: 'center',
    },
    optionsContainer: {
        display: 'flex',
        flexDirection: 'column',
        flex: '1',
        height: '95.1%',
        alignSelf: 'center',
        alignItems: 'center',
        marginTop: '4%',
        borderRadius: '10vh 10vh 0 0',
        background: '#cdffd5',
    },
    subtext: {
        color: '#black',
        fontSize: '2rem',
        fontWeight: '700',
        marginTop: '3vh',
    },
    textField: {
        width: '40ch',
    },
    submitButton: {
        width: '20%',
        marginTop: '3vh',
    },
});

export default useStyles;