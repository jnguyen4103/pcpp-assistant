import React from 'react';
import Header from 'components/Header';
import { Box, Card, Grid, Typography } from '@material-ui/core';
import useStyles from './styles';

const LandingPageView = () => {
    const styles = useStyles();

    return (
        <React.Fragment>
            <Header />
            <Grid container className={styles.container}>
                <Grid item xs={6} className={styles.leftGrid}>
                    <Typography className={styles.welcomeText}>
                        Welcome, choose an option to get started.
                    </Typography>
                    <Typography className={styles.subtext}>
                        You&apos;re on your way to an awesome custom PC.
                    </Typography>
                </Grid>
                <Grid item xs={6} className={styles.rightGrid}>
                    <Box className={styles.optionsContainer}>
                        <Card className={styles.optionCards}>
                            <Typography className={styles.optionTexts}>
                                Let me type out my preferences.
                            </Typography>
                        </Card>
                        <Card className={styles.optionCards}>
                            <Typography className={styles.optionTexts}>
                                Let me talk to a digital assistant.
                            </Typography>
                        </Card>
                    </Box>
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

export default LandingPageView;
