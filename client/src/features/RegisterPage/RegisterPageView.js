import React from 'react';
import Header from 'components/Header';
import { Box, TextField, Typography, Button } from '@material-ui/core';
import useStyles from './styles';

const RegisterPageView = () => {
    const styles = useStyles();

    return(
        <Box className={styles.container}>
            <Header />
            <Box className={styles.innerContainer}>
                <Box className={styles.optionsContainer}>
                    <Typography className={styles.subtext}>Sign in.</Typography>
                    <TextField
                        label="Username"
                        className={styles.textField}
                    ></TextField>
                    <TextField
                        label="Password"
                        type="password"
                        className={styles.textField}
                    ></TextField>
                    <Button variant="contained" className={styles.submitButton}>
                        Submit
                    </Button>
                    <Typography className={styles.subtext}>
                        Create an account.
                    </Typography>
                    <TextField label="Username" className={styles.textField}>
                        Username
                    </TextField>
                    <TextField label="Email" className={styles.textField}>
                        Email
                    </TextField>
                    <TextField label="First Name" className={styles.textField}>
                        First Name
                    </TextField>
                    <TextField label="Last Name" className={styles.textField}>
                        Last Name
                    </TextField>
                    <TextField
                        label="Password"
                        type="password"
                        className={styles.textField}
                    >
                        Password
                    </TextField>
                    <TextField
                        label="Confirm Password"
                        type="password"
                        className={styles.textField}
                    >
                        Password2
                    </TextField>
                    <Button variant="contained" className={styles.submitButton}>
                        Submit
                    </Button>
                </Box>
            </Box>

        </Box>

    );
};

export default RegisterPageView;