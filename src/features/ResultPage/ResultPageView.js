import React from 'react';
import Header from 'components/Header';
import { Box } from '@material-ui/core';
import useStyles from './styles';
//import parts from 'data/test1';

const ResultPageView = () => {
    const styles = useStyles();
    return (
        <Box className={styles.container}>
            <Header />
            <Box className={styles.innerContainer}></Box>
        </Box>
    );
};

export default ResultPageView;
