import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
    },
    innerContainer: {
        height: '100%',
        width: '75%',
        background: 'white',
        alignSelf: 'center',
        marginTop: '4%',
        borderRadius: '10vh 10vh 0 0',
        overflow: 'hidden',
        boxShadow: '5px 5px 10px 5px #000000',
    },
    accountText: {
        color: 'white',
        fontSize: '2rem',
        fontWeight: '700',
        alignSelf: 'center',
    },
});

export default useStyles;