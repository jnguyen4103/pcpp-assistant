import React, { useState, useEffect } from 'react';
import AssistantPageView from './AssistantPageView';
import axios from 'axios';

const AssistantPage = () => {
    const [sessionId, setSessionId] = useState(null);
    const [message, setMessage] = useState({ text: '', type: null });
    const [messages, setMessages] = useState([]);
    const [games, setGames] = useState([]);
    const [budget, setBudget] = useState('0');
    const [sysReq, setSysReq] = useState({});

    // Initialize the assistant
    useEffect(() => {
        let id = axios.get('/getAssistantID').then((res) => {
            setSessionId(res.data.session_id);
            return res.data.session_id;
        });

        id.then((res) => {
            getResponse(res, '').then((res) => {
                const response = { text: res, type: 'systemResponse' };
                setMessages((messages) => [...messages, response]);
            });
        });
    }, []);

    // Find system requirements based on games
    useEffect(() => {
        if (games.length > 0) {
            let gamesArray = [];
            games[0].forEach((game) => {
                if (game.entity == 'game') {
                    gamesArray.push(game.value);
                }
            });

            axios
                .post('/getGamesRequirements', {
                    games: gamesArray,
                    budget: budget,
                })
                .then((res) => {
                    setSysReq(res.data);
                });
        }
    }, [games]);

    const getResponse = (id, message) => {
        let response = axios
            .post('/getAssistantResponse', {
                sessionId: id,
                userMessage: message,
            })
            .then(
                (res) => {
                    if (
                        res.data.output.generic[0].text.includes(
                            "Nice. I'll find a PC that can handle"
                        )
                    ) {
                        setGames((games) => [
                            ...games,
                            res.data.output.entities,
                        ]);
                    }
                    if (
                        res.data.output.generic[0].text.includes(
                            'Got it, thanks! Your budget'
                        )
                    ) {
                        setBudget(res.data.output.entities[1].value);
                    }
                    return res.data.output.generic[0].text;
                },
                (error) => {
                    console.log(error);
                }
            );

        return response;
    };

    const handleClick = () => {
        setMessages((messages) => [...messages, message]);
        getResponse(sessionId, message.text).then((res) => {
            const response = { text: res, type: 'systemResponse' };
            setMessages((messages) => [...messages, response]);
        });
        setMessage({ text: '', type: null });
    };

    const handlePressEnter = (event) => {
        if (event.key === 'Enter') {
            setMessages((messages) => [...messages, message]);
            getResponse(sessionId, message.text).then((res) => {
                const response = { text: res, type: 'systemResponse' };
                setMessages((messages) => [...messages, response]);
            });
            setMessage({ text: '', type: null });
        }
    };

    const handleUserInput = (event) => {
        setMessage({
            text: event.target.value,
            type: 'userInput',
        });
    };

    return (
        <AssistantPageView
            sessionId={sessionId}
            handleClick={handleClick}
            handlePressEnter={handlePressEnter}
            handleUserInput={handleUserInput}
            message={message}
            messages={messages}
            sysReq={sysReq}
        />
    );
};

export default AssistantPage;
