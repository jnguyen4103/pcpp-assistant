import React from 'react';
import Header from 'components/Header';
import { Box, Card, Typography } from '@material-ui/core';
import useStyles from './styles';

const RegisterPageView = () => {
    const styles = useStyles();

    return(
        <Box className={styles.container}>
            <Header />
            <Box className={styles.innerContainer}>
            </Box>
        </Box>

    );
};

export default RegisterPageView;