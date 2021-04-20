import React, { useCallback, useRef, useEffect } from 'react';
import Header from 'components/Header';
import { Box, IconButton, Input, Typography } from '@material-ui/core';
import useStyles from './styles';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const AssistantPageView = (props) => {
    const styles = useStyles();

    const createChatFeed = useCallback(
        props.messages.map((message, index) => {
            if (message.type == 'userInput') {
                return (
                    <Box className={styles.userMessageBubble} key={index}>
                        <Typography className={styles.userText}>
                            {message.text}
                        </Typography>
                    </Box>
                );
            } else {
                return (
                    <Box className={styles.systemResponseBubble} key={index}>
                        <Typography className={styles.responseText}>
                            {message.text}
                        </Typography>
                    </Box>
                );
            }
        }),
        [props.messages]
    );

    // This code block handles the logic of scrolling the chat feed to the bottom as new messages appear
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [props.messages, Object.keys(props.sysReq).length]);

    return (
        <Box className={styles.container}>
            <Header />
            <Box className={styles.innerContainer}>
                <Box className={styles.chatContainer}>
                    {createChatFeed}
                    {Object.keys(props.sysReq).length > 0 ? (
                        <Box className={styles.systemResponseBubble}>
                            <Typography
                                className={styles.responseText}
                                component={Link}
                                to={{
                                    pathname: '/result-page',
                                    pc: props.sysReq,
                                }}
                            >
                                Click here to see your PC!
                            </Typography>
                        </Box>
                    ) : null}
                    <Box ref={messagesEndRef} />
                </Box>
                <Input
                    className={styles.textField}
                    placeholder="Chat with your digital assistant"
                    endAdornment={
                        <IconButton
                            className={styles.enterButton}
                            disableRipple={true}
                            onClick={props.handleClick}
                        >
                            <ArrowUpwardIcon className={styles.enterIcon} />
                        </IconButton>
                    }
                    onChange={props.handleUserInput}
                    onKeyPress={props.handlePressEnter}
                    value={props.message.text}
                />
            </Box>
        </Box>
    );
};

AssistantPageView.propTypes = {
    handleClick: PropTypes.func,
    handlePressEnter: PropTypes.func,
    handleUserInput: PropTypes.func,
    message: PropTypes.object,
    messages: PropTypes.array,
    sysReq: PropTypes.object,
};

export default AssistantPageView;
