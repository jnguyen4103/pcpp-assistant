import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
    },
    innerContainer: {
        background: 'white',
        display: 'flex',
        flex: '1',
        width: '80%',
        alignSelf: 'center',
        marginTop: '5%',
        borderRadius: '5rem 5rem 0 0',
    },
});

export default useStyles;
