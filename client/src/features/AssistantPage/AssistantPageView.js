import React, { useCallback, useState, useRef, useEffect } from 'react';
import Header from 'components/Header';
import { Box, IconButton, Input, Typography } from '@material-ui/core';
import useStyles from './styles';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import axios from 'axios';

const AssistantPageView = () => {
    const [sessionId, setSessionId] = useState(null);

    useEffect(() => {
        let id = axios.get('/getAssistantID').then((res) => {
            setSessionId(res.data.session_id);
            return res.data.session_id;
        });

        id.then((res) => {
            console.log(res);
        });
    }, []);

    const styles = useStyles();

    const [message, setMessage] = useState({ text: '', type: null });
    const [messages, setMessages] = useState([]);

    const handleClick = () => {
        setMessages((messages) => [...messages, message]);
        getResponse(message.text).then((res) => {
            const response = { text: res, type: 'systemResponse' };
            setMessages((messages) => [...messages, response]);
        });
        setMessage({ text: '', type: null });
    };

    const handlePressEnter = (event) => {
        if (event.key === 'Enter') {
            setMessages((messages) => [...messages, message]);
            getResponse(message.text).then((res) => {
                const response = { text: res, type: 'systemResponse' };
                setMessages((messages) => [...messages, response]);
            });
            setMessage({ text: '', type: null });
        }
    };

    const getResponse = (message) => {
        let response = axios
            .post('/getAssistantResponse', {
                sessionId: sessionId,
                userMessage: message,
            })
            .then(
                (res) => {
                    return res.data.output.generic[0].text;
                },
                (error) => {
                    console.log(error);
                }
            );

        return response;
    };

    const createChatFeed = useCallback(
        messages.map((message, index) => {
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
                        setMessage({
                            text: event.target.value,
                            type: 'userInput',
                        });
                    }}
                    onKeyPress={handlePressEnter}
                    value={message.text}
                />
            </Box>
        </Box>
    );
};

export default AssistantPageView;
