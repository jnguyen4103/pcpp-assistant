import React, { useCallback, useState, useRef, useEffect } from 'react';
import Header from 'components/Header';
import { Box, IconButton, Input, Typography } from '@material-ui/core';
import useStyles from './styles';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import responses from 'data/assistant-responses';

const AssistantPageView = () => {
    const styles = useStyles();

    const [message, setMessage] = useState({ message: '', type: null });
    const [messages, setMessages] = useState([]);

    const handleClick = () => {
        setMessages([...messages, message]);
        getResponse(message.message);
        setMessage({ message: '', type: null });
    };

    const handlePressEnter = (event) => {
        if (event.key === 'Enter') {
            setMessages([...messages, message]);
            getResponse(message.message);
            setMessage({ message: '', type: null });
        }
    };

    const getResponse = (message) => {
        return responses[message]
            ? responses[message].response
            : 'Message received';
    };

    const createChatFeed = useCallback(
        messages.map((message, index) => {
            return (
                <React.Fragment key={index}>
                    <Box className={styles.userMessageBubble}>
                        <Typography className={styles.userText}>
                            {message.message}
                        </Typography>
                    </Box>
                    <Box className={styles.systemResponseBubble}>
                        <Typography className={styles.responseText}>
                            {getResponse(message.message)}
                        </Typography>
                    </Box>
                </React.Fragment>
            );
        }),
        [messages]
    );

    // This code block handles the logic of scrolling the chat feed to the bottom as new messages appear
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <Box className={styles.container}>
            <Header />
            <Box className={styles.innerContainer}>
                <Box className={styles.chatContainer}>
                    <Box className={styles.systemResponseBubble}>
                        <Typography className={styles.responseText}>
                            Hello and welcome! I&apos;m your digital assistant,
                            here to assist you with your PC building needs. What
                            would you like to do today? You can say &quot;Build
                            a PC&quot; if you would like us to get you started
                            on your dream system or if you would just like to
                            check if a component is in stock, just say &quot;Is
                            [component name] in stock?&quot; and I would be
                            happy to assist you.
                        </Typography>
                    </Box>
                    {createChatFeed}
                    <Box ref={messagesEndRef} />
                </Box>
                <Input
                    className={styles.textField}
                    placeholder="Chat with your digital assistant"
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
                        setMessage({
                            message: event.target.value,
                            type: 'userMessage',
                        });
                    }}
                    onKeyPress={handlePressEnter}
                    value={message.message}
                />
            </Box>
        </Box>
    );
};

export default AssistantPageView;
