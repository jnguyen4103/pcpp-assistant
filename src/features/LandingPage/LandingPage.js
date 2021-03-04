import React from 'react';
import LandingPageView from './LandingPageView';

const LandingPage = () => {
    window.watsonAssistantChatOptions = {
        integrationID: 'd9007a13-0161-45d7-a7fe-11623cbf0ae7', // The ID of this integration.
        region: 'us-south', // The region your integration is hosted in.
        serviceInstanceID: '8ef0dba1-df05-4676-9e85-d9fde24317e6', // The ID of your service instance.
        onLoad: function (instance) {
            instance.render();
        },
    };
    setTimeout(function(){
        const t = document.createElement('script');
        t.src =
            'https://web-chat.global.assistant.watson.appdomain.cloud/loadWatsonAssistantChat.js';
        document.head.appendChild(t);
    });
    return <LandingPageView />;
};

export default LandingPage;
