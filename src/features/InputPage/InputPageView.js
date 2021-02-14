import React from 'react';
import Header from 'components/Header';
import {
    Box,
    TextField,
    Typography,
    MenuItem,
    Button,
} from '@material-ui/core';
import useStyles from './styles';
import { Link } from 'react-router-dom';

//Presentational stuff
//yarn lint:fix
const InputPageView = () => {
    const styles = useStyles();
    /*const setBudget = React.useState('');
    const handleChange = (event) => {
        setBudget(event.target.value);
    }
    */
    return (
        <Box className={styles.container}>
            <Header />
            <Box className={styles.innerContainer}>
                <Typography className={styles.headingText}>
                    Tell us more about your preferences
                </Typography>
                <Box className={styles.questionsContainer}>
                    <Typography className={styles.subText}>
                        What is your budget?
                    </Typography>
                    <TextField
                        id="budgetField"
                        variant="outlined"
                        className={styles.selectField}
                        select
                        //onChange={handleChange}
                    >
                        <MenuItem value={0}>$0-$500</MenuItem>
                        <MenuItem value={500}>$500-$1000</MenuItem>
                        <MenuItem value={1000}>$1000-$1500</MenuItem>
                        <MenuItem value={1500}>$1500-$2000</MenuItem>
                        <MenuItem value={2000}>$2000+</MenuItem>
                    </TextField>

                    <Typography className={styles.subText}>
                        What will you use the PC for? Select all that apply.
                    </Typography>
                    <TextField
                        id="usesField"
                        variant="outlined"
                        className={styles.selectField}
                        select
                    >
                        <MenuItem value={1}>Gaming</MenuItem>
                        <MenuItem value={2}>Video Editing</MenuItem>
                        <MenuItem value={3}>Internet Browsing</MenuItem>
                        <MenuItem value={4}>Work</MenuItem>
                        <MenuItem value={5}>Streaming</MenuItem>
                    </TextField>
                    <Typography className={styles.subText}>
                        What are your preferred stores or suppliers? Select all
                        that apply.
                    </Typography>
                    <TextField
                        id="suppliersField"
                        variant="outlined"
                        className={styles.selectField}
                        select
                    >
                        <MenuItem value={1}>Amazon</MenuItem>
                        <MenuItem value={2}>Micro Center</MenuItem>
                        <MenuItem value={3}>Best Buy</MenuItem>
                        <MenuItem value={4}>Newegg</MenuItem>
                        <MenuItem value={5}>TigerDirect</MenuItem>
                    </TextField>
                </Box>
                <Button
                    variant="contained"
                    component={Link}
                    to={{
                        pathname: '/result-page',
                    }}
                    className={styles.submitButton}
                >
                    Submit
                </Button>
            </Box>
        </Box>
    );
};

export default InputPageView;
