import React from 'react';
import Header from 'components/Header';
import { Box, IconButton, Input } from '@material-ui/core';
import useStyles from './styles';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

const AssistantPageView = () => {
    const styles = useStyles();

    return (
        <Box className={styles.container}>
            <Header />
            <Box className={styles.chatContainer}>
                <Input
                    className={styles.textField}
                    placeholder="Enter text here..."
                    endAdornment={
                        <IconButton
                            className={styles.enterButton}
                            disableRipple="true"
                        >
                            <ArrowUpwardIcon className={styles.enterIcon} />
                        </IconButton>
                    }
                />
            </Box>
        </Box>
    );
};

export default AssistantPageView;
