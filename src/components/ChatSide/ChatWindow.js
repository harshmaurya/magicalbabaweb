import React, { useState, useRef } from 'react';
import ChatCollection from './ChatCollection';
import ChatTextProvider from '../GamePlay/ChatTextProvider';
import useTimeout from '../../utils/useTimeout';
import './ChatWindow.css';

/**
 * @param {{ textProvider: ChatTextProvider; }} props
 */
function ChatWindow(props) {

    const [chatHistory, setchatHistory] = useState([]);
    const [input, setInput] = useState('');
    const [currentStage, setcurrentStage] = useState(0);
    const timerInterval = 2000;
    /** @type {(arg0: boolean) => void} */
    const timerTrigger = useTimeout(ShowBabaResponse, timerInterval);

    let textProvider = props.textProvider;

    /**
     * @param {string} input
     */
    const InputChangedHandler = (input) => {
        return textProvider.ConvertUserText(input);
    }

    const onFormSubmit = e => {
        e.preventDefault();
        HandleSendMessage();
    }

    return (
        <div className="Chat-window">
            <ChatCollection chatHistory={chatHistory}></ChatCollection>
            <div className="UserInput">
                <form onSubmit={onFormSubmit}>
                    <input type="text" value={input} onChange={e => setInput(InputChangedHandler(e.target.value))}></input>
                    <button type="submit">Send Msg</button>
                </form>
            </div>
        </div>
    );


    function HandleSendMessage() {
        let newStage = currentStage + 1;
        textProvider.SetStage(newStage);
        let updatedChats = chatHistory.concat(input);
        setcurrentStage(newStage);
        setInput("");
        setchatHistory(updatedChats);
        timerTrigger(true);
    }

    function ShowBabaResponse() {
        let babaResponse = textProvider.GetBabaMessage();
        let updatedChats = chatHistory.concat(babaResponse);
        setchatHistory(updatedChats);
        setcurrentStage(currentStage + 1);
    }
}

export default ChatWindow;