import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        paddingTop: '1rem',
    },
    logoContainer: {
        display: 'flex',
        '&:link': {
            textDecoration: 'none',
        },
        '&:hover': {
            opacity: '0.7',
        },
    },
    logoIcon: {
        color: 'white',
        width: '5rem',
        height: '5rem',
        marginLeft: '2rem',
        marginRight: '1rem',
    },
    logoText: {
        color: 'white',
        fontSize: '3rem',
        fontWeight: '700',
        alignSelf: 'flex-end',
    },
    accountText: {
        color: 'white',
        fontSize: '2rem',
        fontWeight: '700',
        marginRight: '2rem',
        alignSelf: 'center',
    },
});

export default useStyles;
