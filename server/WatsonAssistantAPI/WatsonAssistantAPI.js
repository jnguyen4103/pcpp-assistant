const prompt = require('prompt-sync')();
const AssistantV2 = require('ibm-watson/assistant/v2');
const { IamAuthenticator } = require('ibm-watson/auth');

// Create Assistant service object.
const assistant = new AssistantV2({
    version: '2021-02-22',
    authenticator: new IamAuthenticator({
        apikey: '0PVjD3rkG8KdwSDXLT2TZZPjEVZVkzsS-mXI1EZR9zLI', // replace with API key
    }),
    url: 'https://api.us-south.assistant.watson.cloud.ibm.com', // replace with URL
});

const assistantId = '2303c86f-1b64-42d7-aae9-bb3435f312f0'; // replace with assistant ID

// Start conversation with empty message
const messageInput = {
    messageType: 'text',
    text: '',
};
const context = {};
sendMessage(messageInput, context);

// Send message to assistant.
function sendMessage(messageInput, context) {
    assistant
        .messageStateless({
            assistantId,
            input: messageInput,
            context: context,
        })
        .then((res) => {
            processResponse(res.result);
        })
        .catch((err) => {
            console.log(err); // something went wrong
        });
}

// Process the response.
function processResponse(response) {
    let context = response.context;

    // If an intent was detected, log it out to the console.
    if (response.output.intents.length > 0) {
        console.log('Detected intent: #' + response.output.intents[0].intent);
    }

    // Display the output from assistant, if any. Supports only a single
    // text response.
    if (response.output.generic) {
        if (response.output.generic.length > 0) {
            if (response.output.generic[0].response_type === 'text') {
                console.log(response.output.generic[0].text);
            }
        }
    }

    // If we're not done, prompt for the next round of input.
    const newMessageFromUser = prompt('>> ');
    if (newMessageFromUser !== 'quit') {
        const newMessageInput = {
            messageType: 'text',
            text: newMessageFromUser,
        };
        sendMessage(newMessageInput, context);
    }
}
