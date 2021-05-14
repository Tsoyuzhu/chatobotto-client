import React, {useRef, useEffect} from 'react';
import styled from 'styled-components';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import ChatInput from './ChatInput';

const ChatApp = ({
  handleBufferChange,
  handleFormSubmit,
  disconnect,
  connect,
  connected,
  buffer,
  handle,
  messageBank, 
  handleColor
}) => {

  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messageBank]);

  return (
    <Window>
      {
        connected ?
        <ChatButton onClick={disconnect} variant="outlined" color="secondary">DISCONNECT</ChatButton>
        :<ChatButton onClick={connect} variant="outlined" color="secondary">CONNECT</ChatButton> 
      }
      <Box>
        <Chatbox onChange={scrollToBottom}>
          {
            connected && 
            messageBank.map((message, index) => {
              switch (message.type) {
                case "MESSAGE":
                  return (<Message key={index} creator={message.creator} timestamp={message.timestamp} message={message.message} color={message.colorCode}/>);
                case "JOIN":
                  return (<LeaveJoinMessage key={index} creator={message.creator} type={message.type} message={message.message} color={message.colorCode}/>);
                case "LEAVE":
                  return (<LeaveJoinMessage key={index} creator={message.creator} type={message.type} message={message.message} color={message.colorCode}/>);
                default:
                  return null;
              }
            })
          }
          <div ref={messagesEndRef} />
        </Chatbox>
        <ChatInput connected={connected} handle={handle} onSubmit={handleFormSubmit} onChange={handleBufferChange} buffer={buffer} handleColor={handleColor}/>
      </Box>
    </Window>
  )
}

const Message = (props) => {
  const {
    creator,
    timestamp,
    message,
    color
  } = props;

  return (
    <MessageContainer>
      <Timestamp>
        <TimestampWrapper>{timestamp}</TimestampWrapper>
      </Timestamp>
      <MessageSender><HandleSpan color={color}>{creator}</HandleSpan>: </MessageSender>
      <MessageContents>{message}</MessageContents>
    </MessageContainer>
  )
}

const LeaveJoinMessage = (props) => {
  const { creator, type, color, message } = props;
  return (
    <MessageContainer>
      <MessageContents>
        {type === "JOIN" ? <EnteredIcon/>
        : type === "LEAVEL" ? <LeaveIcon/>
        : null }
        <HandleSpan color={color}>{creator} </HandleSpan>
        {message}
      </MessageContents>
    </MessageContainer>
  )
}

export default ChatApp;

const Window = styled(Box)`
  padding: 10px;
`

const Chatbox = styled(Box)`
  border: 0.5px solid black;
  overflow-wrap: break-word;  
  padding: 2px 5px;
  height: 600px;
  overflow-y: scroll;
`

const ChatButton = styled(Button)` 
  margin-bottom: 10px !important;
`

const MessageContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  
`
const MessageChild = styled.div`
  padding: 2px;
`

const Timestamp = styled(MessageChild)`
  width: 70px;
  position: static;
  white-space:nowrap;
  font-size: 15px;
  opacity: 0.5;
`

const TimestampWrapper = styled.span`
  vertical-align: bottom;
`

const MessageSender = styled(MessageChild)`
  width: auto;
  white-space:nowrap;
  font-weight: bold;
`

const MessageContents = styled(MessageChild)`
  width: 92%;
  overflow-wrap: break-word;  
`

const HandleSpan = styled.span`
  font-weight: bold;
  color: ${props => props.color ? props.color : "black"};
`

const EnteredIcon = styled(KeyboardArrowRightIcon)`
  transform: translateY(6px);
`

const LeaveIcon = styled(KeyboardArrowLeftIcon)`
  transform: translateY(6px);
`