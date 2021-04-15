import React from 'react';
import { Box, Typography } from '@material-ui/core';
import AndroidIcon from '@material-ui/icons/Android';
import useStyles from './styles';
import { Link } from 'react-router-dom';

const Header = () => {
    const styles = useStyles();
    return (
        <Box className={styles.container}>
            <Box
                className={styles.logoContainer}
                component={Link}
                to={{
                    pathname: '/',
                }}
            >
                <AndroidIcon className={styles.logoIcon} />
                <Typography className={styles.logoText}>
                    PCPP-ASSISTANT
                </Typography>
            </Box>
            <Box
                className={styles.logoContainer}
                component={Link}
                to={{
                    pathname: '/register-page',
                }}>
                <Typography className={styles.accountText}>
                    sign in | register
                </Typography>
            </Box>

        </Box>
    );
};

export default Header;
