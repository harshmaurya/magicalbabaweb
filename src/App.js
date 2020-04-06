import React from 'react';
import logo from './logo.svg';
import './App.css';
import './components/BabaSide/BabaWindow';
import './components/ChatSide/ChatWindow';
import BabaWindow from './components/BabaSide/BabaWindow';
import ChatWindow from './components/ChatSide/ChatWindow';
import ChatTextProvider from './components/GamePlay/ChatTextProvider';

function App() {
  let chatTextProvider = new ChatTextProvider();
  return (
    <div>
      <BabaWindow></BabaWindow>
      <ChatWindow textProvider={chatTextProvider}></ChatWindow>
    </div>
  );
}

export default App;
