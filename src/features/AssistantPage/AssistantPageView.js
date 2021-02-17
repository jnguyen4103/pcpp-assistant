import React, { useState } from 'react';
import Header from 'components/Header';
import { Box, IconButton, Input } from '@material-ui/core';
import useStyles from './styles';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

const AssistantPageView = () => {
    const styles = useStyles();

    const [message, setMessage] = useState('');

    const handleClick = () => {
        console.log(message);
        setMessage('');
    };

    const handlePressEnter = (event) => {
        if (event.key === 'Enter') {
            console.log(message);
            setMessage('');
        }
    };

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
                            onClick={handleClick}
                        >
                            <ArrowUpwardIcon className={styles.enterIcon} />
                        </IconButton>
                    }
                    onChange={(event) => {
                        setMessage(event.target.value);
                    }}
                    onKeyPress={handlePressEnter}
                    value={message}
                />
            </Box>
        </Box>
    );
};

export default AssistantPageView;
