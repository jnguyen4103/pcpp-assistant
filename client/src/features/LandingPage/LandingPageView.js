import React from 'react';
import Header from 'components/Header';
import { Box, Card, Typography } from '@material-ui/core';
import useStyles from './styles';
import { Link } from 'react-router-dom';

const LandingPageView = () => {
    const styles = useStyles();

    return (
        <Box className={styles.container}>
            <Header />
            <Box className={styles.innerContainer}>
                <Box className={styles.leftBox}>
                    <Typography className={styles.welcomeText}>
                        Welcome, choose an option to get started.
                    </Typography>
                    <Typography className={styles.subtext}>
                        You&apos;re on your way to an awesome custom PC.
                    </Typography>
                </Box>
                <Box className={styles.rightBox}>
                    <Box className={styles.optionsContainer}>
                        <Card
                            className={styles.optionCards}
                            component={Link}
                            to={{
                                pathname: '/input-page',
                            }}
                        >
                            <Typography className={styles.optionTexts}>
                                Let me type out my preferences.
                            </Typography>
                        </Card>
                        <Card
                            className={styles.optionCards}
                            component={Link}
                            to={{
                                pathname: '/assistant-page',
                            }}
                        >
                            <Typography className={styles.optionTexts}>
                                Let me talk to a digital assistant.
                            </Typography>
                        </Card>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default LandingPageView;
