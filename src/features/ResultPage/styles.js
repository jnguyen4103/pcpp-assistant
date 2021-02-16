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
    contentContainer: {
        height: 'inherit',
        overflow: 'auto',
        padding: '4vh 0vw 0vh 2vw',
    },
    partContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '2vh',
        marginRight: '2vw',
        border: '2px solid black',
        borderRadius: '5vh 5vh',
        padding: '0 2vw',
    },
    leftContainer: {
        width: '20%',
        display: 'flex',
        alignItems: 'center',
    },
    middleContainer: {
        width: '65%',
        display: 'flex',
        alignItems: 'center',
    },
    rightContainer: {
        width: '15%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    partLabel: {
        fontSize: '2rem',
        fontWeight: '700',
    },
    image: {
        maxWidth: '10vw',
        height: 'auto',
        marginRight: '5vw',
    },
    partName: {
        fontSize: '2rem',
        fontWeight: '700',
        maxWidth: '30vw',
        height: 'auto',
    },
    priceAndStore: {
        fontSize: '1.5rem',
        fontWeight: '700',
    },
    cartIcon: {
        fontSize: '3rem',
        '&:hover': {
            color: 'green',
            cursor: 'pointer',
        },
    },
});

export default useStyles;
