import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    leftGrid: {
        display: 'inline-block',
        background: 'red',
    },
    welcomeText: {
        color: 'white',
        fontSize: '4rem',
        fontWeight: '700',
    },
    subtext: {
        color: 'gray',
        fontSize: '2rem',
        fontWeight: '700',
    },
});

export default useStyles;
