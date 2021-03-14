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
        height: '100%',
        overflow: 'auto',
        margin: '0 2vw',
    },
    partContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: '4vh 1vw 4vh 0',
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
        maxWidth: '25vw',
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
