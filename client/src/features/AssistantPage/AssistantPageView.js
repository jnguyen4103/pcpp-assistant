import React, { useCallback, useState, useRef, useEffect } from 'react';
import Header from 'components/Header';
import { Box, IconButton, Input, Typography } from '@material-ui/core';
import useStyles from './styles';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import axios from 'axios';

const AssistantPageView = () => {
    const [sessionId, setSessionId] = useState(null);

    useEffect(() => {
        axios.get('/getAssistantID').then((res) => {
            setSessionId(res.data.session_id);
        });
    }, []);

    const styles = useStyles();

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const handleClick = () => {
        setMessages([...messages, message]);
        getResponse(message);
        setMessage('');
    };

    const handlePressEnter = (event) => {
        if (event.key === 'Enter') {
            setMessages([...messages, message]);
            getResponse(message);
            setMessage('');
        }
    };

    const getResponse = (message) => {
        axios
            .post('/getAssistantResponse', {
                sessionId: sessionId,
                userMessage: message,
            })
            .then(
                (res) => {
                    console.log(res.data.output.generic[0].text);
                },
                (error) => {
                    console.log(error);
                }
            );
    };

    const createChatFeed = useCallback(
        messages.map((message, index) => {
            return (
                <React.Fragment key={index}>
                    <Box className={styles.userMessageBubble}>
                        <Typography className={styles.userText}>
                            {message}
                        </Typography>
                    </Box>
                    <Box className={styles.systemResponseBubble}>
                        <Typography className={styles.responseText}>
                            message received
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
                    {createChatFeed}
                    <Box ref={messagesEndRef} />
                </Box>
                <Input
                    className={styles.textField}
                    placeholder="Chat with your digital assistant"
                    endAdornment={
                        <IconButton
                            className={styles.enterButton}
                            disableRipple={true}
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
