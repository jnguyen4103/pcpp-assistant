import React from 'react';
import Header from 'components/Header';
import { Box } from '@material-ui/core';
import useStyles from './styles';


//Presentational stuff
//yarn lint:fix
const InputPageView = () => {
    const styles = useStyles();
    return (
        <Box className={styles.container}>
            <Header />
            <Box className={styles.innerContainer}>
                
            </Box>
        </Box>
    );
};

export default InputPageView;
