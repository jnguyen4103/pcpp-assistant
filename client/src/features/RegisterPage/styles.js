import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
    },
    innerContainer: {
        height: '100%',
        width: '70%',
        display: 'flex',
        flex: '1',
        flexDirection: 'row',
        alignSelf: 'center',
    },
    accountText: {
        color: 'white',
        fontSize: '2rem',
        fontWeight: '700',
        alignSelf: 'center',
    },
    optionsContainer: {
        display: 'flex',
        flexDirection: 'row',
        flex: '1',
        height: '100%',
        width: '50%',
        alignSelf: 'center',
        alignItems: 'center',
        marginTop: '4%',
        borderRadius: '10vh 10vh 0 0',
        background: '#cdffd5',
    },
    centerBox: {
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        paddingTop: '4vh',
        flex: '1',
    },
});

export default useStyles;