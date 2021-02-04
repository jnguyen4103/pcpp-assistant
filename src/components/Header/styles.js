import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: '16px',
  },
  logoContainer: {
    display: 'flex',
  },
  logoIcon: {
    color: 'white',
    width: '5rem',
    height: '5rem',
    marginLeft: '24px',
    marginRight: '16px',
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
    marginRight: '24px',
    alignSelf: 'center',
  },
});

export default useStyles;