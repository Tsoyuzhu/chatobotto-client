import React, { useState } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import randomColor from 'randomcolor';
import { getJoinMessage, getLeaveMessage } from './Message';

import ChatApp from './components/ChatApp';


const CHATOBOTTO_HOST = "http://localhost:8080/chatobotto";

const App = () => {
  const [connected, setConnected] = useState(false);
  const [messageBank, setMessageBank] = useState([]);
  const [stompClient, setStompClient] = useState(null);
  const [buffer, setBuffer] = useState([]);
  const [handle, setHandle] = useState("");  
  const [handleColor, setHandleColor] = useState("black");

  const showMessage = (message) => {
      setMessageBank(existingBank => [...existingBank, message]);
  }

  const sendMessage = (message) => {
    if (!connected) {
      console.log("Not connected. Cannot send message");
    } else {
      stompClient.send("/app/sendMessage", {}, JSON.stringify({"message": message, "creator": handle, "type": "MESSAGE","colorCode": handleColor}));
    }
  }

  const connect = () => {
    // Attempt initial connection
    const socket = new SockJS(CHATOBOTTO_HOST);
    const stompClient = Stomp.over(socket);  
    stompClient.connect({}, (frame) => {
      stompClient.subscribe('/app/getHandle', (connectionResponse) => {
        if (connectionResponseSuccessful(connectionResponse, frame)) {
          // If connection successful we can subscribe
          const handleColor = randomColor();
          const handle = getHandleFromConnectionResopnse(connectionResponse);
          stompClient.subscribe('/topic/allYourWeabooFriends', (chatMessage) => { showMessage(JSON.parse(chatMessage.body)) });
          stompClient.send("/app/sendMessage", {}, JSON.stringify({"message": getJoinMessage(), "creator": handle, "type": "JOIN", "colorCode": handleColor}));
          setStompClient(stompClient);
          setConnected(true);
          setHandle(handle);
          setHandleColor(handleColor);
        }
      });
    });
  };

  const connectionResponseSuccessful = (connectionResponse) => {
    let response = JSON.parse(connectionResponse.body);
    return !!response.connectionSuccessful;
  }

  const getHandleFromConnectionResopnse = (connectionResponse) => {
    return JSON.parse(connectionResponse.body).chatHandle.handle;
  }

  const disconnect = () => {
    stompClient.send("/app/sendMessage", {}, JSON.stringify({"message": getLeaveMessage(), "creator": handle, "type": "LEAVE", "colorCode": handleColor}));
    stompClient.disconnect();
    setBuffer(null);
    setConnected(false);
    setHandle(null);
    setMessageBank([]);
  }

  const handleBufferChange = (e) => {
    setBuffer(e.target.value);
  } 

  const handleFormSubmit = (e) => {
    e.preventDefault();
    sendMessage(buffer);
    setBuffer("");
  }

  const props = {
    handleBufferChange,
    handleFormSubmit,
    disconnect,
    connect,
    connected,
    buffer,
    handle,
    messageBank,
    handleColor
  }
  return (
  <ChatApp {...props}/>
  );
}

export default App;

