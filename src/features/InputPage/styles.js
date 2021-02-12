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
        flexDirection: 'column',
        width: '80%',
        alignSelf: 'center',
        borderRadius: '5rem 5rem 0rem 0rem',
        marginTop: '5%'
        //border: '2px solid red'
    },
    headingText: {
        color: 'black',
        fontSize: '3rem',
        fontWeight: '100',
        paddingLeft: '2.5rem',
        paddingTop: '2rem',
    },
    questionsContainer: {
        display: 'flex',
        flex: '1',
        flexDirection: 'column',
        //width: '50%',
    },
    subText: {
        color: 'black',
        fontSize: '1.5rem',
        fontWeight: '100',
        paddingLeft: '3rem',
        paddingTop: '1.5rem'
    },
    selectField:{
        paddingLeft: '3rem',
        paddingRight: '60%',
        paddingTop: '1rem',
    }
});

export default useStyles;
