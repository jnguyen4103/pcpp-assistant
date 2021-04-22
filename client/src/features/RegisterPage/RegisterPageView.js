import React from 'react';
import Header from 'components/Header';
import { Box, TextField, Typography, Button } from '@material-ui/core';
import useStyles from './styles';
import PropTypes from 'prop-types';

const RegisterPageView = (props) => {
    const styles = useStyles();

    return (
        <Box className={styles.container}>
            <Header />
            <Box className={styles.innerContainer}>
                <Box className={styles.optionsContainer}>
                    <Typography className={styles.subtext}>Sign in.</Typography>
                    <TextField
                        label="Username"
                        id="username"
                        className={styles.textField}
                    ></TextField>
                    <TextField
                        label="Password"
                        type="password"
                        id="password"
                        className={styles.textField}
                    ></TextField>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={props.handleClick}
                        className={styles.submitButton}
                    >
                        Submit
                    </Button>
                    <Typography className={styles.subtext}>
                        Create an account.
                    </Typography>
                    <TextField
                        label="Username"
                        id="createUsername"
                        className={styles.textField}
                    ></TextField>
                    <TextField
                        label="Email"
                        id="email"
                        className={styles.textField}
                    ></TextField>
                    <TextField
                        label="First Name"
                        id="firstName"
                        className={styles.textField}
                    ></TextField>
                    <TextField
                        label="Last Name"
                        id="lastName"
                        className={styles.textField}
                    ></TextField>
                    <TextField
                        label="Password"
                        type="password"
                        id="createPassword"
                        className={styles.textField}
                    ></TextField>
                    <TextField
                        label="Confirm Password"
                        type="password"
                        id="confirmPassword"
                        className={styles.textField}
                    ></TextField>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={props.handleClick}
                        className={styles.submitButton}
                    >
                        Submit
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

RegisterPageView.propTypes = {
    handleClick: PropTypes.func,
};

export default RegisterPageView;
