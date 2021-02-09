import { makeStyles } from '@material-ui/core/styles';

//CSS stuff
const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
    },
    innerContainer: {
        background: 'white',
        display: 'flex',
        flex: '1',
        width: '80%',
        alignSelf: 'center',
        borderRadius: '5rem 5rem 0rem 0rem',
        marginTop: '5%'
        //border: '2px solid red'
    }
});

export default useStyles;
