import { makeStyles } from '@material-ui/core/styles';

//CSS stuff
const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
    },
    innerContainer: {
        display: 'flex',
        flex: '1',
        flexDirection: 'column',
        height: '100%',
        width: '75%',
        background: 'white',
        alignSelf: 'center',
        marginTop: '4%',
        borderRadius: '10vh 10vh 0 0',
        boxShadow: '5px 5px 10px 5px #000000',
    },
    headingText: {
        color: 'black',
        fontSize: '3rem',
        fontWeight: '200',
        paddingLeft: '2vw',
        paddingTop: '4vh',
    },
    questionsContainer: {
        display: 'flex',
        flex: '1',
        flexDirection: 'column',
    },
    subText: {
        color: 'black',
        fontSize: '1.5rem',
        fontWeight: '100',
        paddingLeft: '2vw',
        paddingTop: '2vh',
    },
    selectField: {
        paddingLeft: '2vw',
        paddingRight: '60%',
        paddingTop: '2vh',
    },
    submitButton: {
        width: '25%',
        alignSelf: 'center',
        marginBottom: '10vh',
    },
});

export default useStyles;
