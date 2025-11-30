import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaUser, FaPaperPlane, FaMinus, FaTimes } from 'react-icons/fa';

const ChatbotContainer = styled(motion.div)`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 350px;
  height: 500px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  z-index: 1000;
  border: 1px solid rgba(255, 255, 255, 0.2);

  @media (max-width: 768px) {
    width: 300px;
    height: 400px;
    bottom: 10px;
    right: 10px;
  }
`;

const ChatHeader = styled.div`
  background: linear-gradient(45deg, #4CAF50, #45a049);
  color: white;
  padding: 15px 20px;
  border-radius: 20px 20px 0 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const HeaderTitle = styled.div`
  h3 {
    margin: 0;
    font-size: 16px;
    font-weight: 600;
  }
  p {
    margin: 0;
    font-size: 12px;
    opacity: 0.9;
  }
`;

const StatusIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 10px;
  font-weight: 500;
  opacity: 0.8;
`;

const StatusDot = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${props => {
    switch (props.status) {
      case 'connected': return '#4CAF50';
      case 'disconnected': return '#e74c3c';
      case 'checking': return '#ffa726';
      default: return '#666';
    }
  }};
  animation: ${props => props.status === 'checking' ? 'pulse 1.5s infinite' : 'none'};

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 10px;
`;

const MinimizeButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 5px;
  border-radius: 5px;
  transition: background 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const ChatBody = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const MessagesContainer = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Message = styled(motion.div)`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  ${props => props.isUser && 'flex-direction: row-reverse;'}
`;

const MessageAvatar = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 14px;
  flex-shrink: 0;
  background: ${props => props.isUser ? 'linear-gradient(45deg, #2196F3, #1976D2)' : 'linear-gradient(45deg, #4CAF50, #45a049)'};
`;

const MessageContent = styled.div`
  max-width: 80%;
  padding: 12px 16px;
  border-radius: 18px;
  background: ${props => props.isUser ? 'linear-gradient(45deg, #2196F3, #1976D2)' : '#f1f3f4'};
  color: ${props => props.isUser ? 'white' : '#333'};
  font-size: 14px;
  line-height: 1.4;
  word-wrap: break-word;
`;

const InputContainer = styled.div`
  padding: 20px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  gap: 10px;
  align-items: center;
`;

const MessageInput = styled.input`
  flex: 1;
  padding: 12px 16px;
  border: 2px solid #e9ecef;
  border-radius: 25px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #4CAF50;
  }

  &::placeholder {
    color: #adb5bd;
  }
`;

const SendButton = styled.button`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  border: none;
  background: linear-gradient(45deg, #4CAF50, #45a049);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 5px 15px rgba(76, 175, 80, 0.4);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const TypingIndicator = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  background: #f1f3f4;
  border-radius: 18px;
  max-width: 80px;
`;

const TypingDot = styled(motion.div)`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #4CAF50;
`;

const HealthChatbot = () => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your health assistant. I can help answer health-related questions. Please note that I'm not a medical professional and always recommend consulting with a qualified healthcare provider.",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('checking');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Check chatbot server connection on component mount
  useEffect(() => {
    const checkConnection = async () => {
      try {
        const response = await fetch('http://localhost:5001/health');
        if (response.ok) {
          setConnectionStatus('connected');
        } else {
          setConnectionStatus('disconnected');
        }
      } catch (error) {
        setConnectionStatus('disconnected');
      }
    };

    checkConnection();
  }, []);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentMessage = inputMessage;
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5001/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: currentMessage }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      const botMessage = {
        id: Date.now() + 1,
        text: data.reply || 'Sorry, I can only answer health-related questions.',
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Chatbot error:', error);
      
      // Provide helpful fallback responses
      let fallbackMessage = '';
      if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        fallbackMessage = 'I\'m currently offline. The chatbot server may not be running. Please try:\n\n1. Make sure the chatbot server is started with: `python chatbot_server.py`\n2. Check that port 5001 is available\n3. Try refreshing the page\n\nFor now, please consult with your healthcare provider for medical questions.';
      } else {
        fallbackMessage = 'I\'m experiencing technical difficulties. Please try again in a moment or contact your healthcare provider directly for immediate medical concerns.';
      }

      const errorMessage = {
        id: Date.now() + 1,
        text: fallbackMessage,
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <ChatbotContainer
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <ChatHeader onClick={() => setIsMinimized(!isMinimized)}>
        <HeaderLeft>
          <FaRobot size={20} />
          <HeaderTitle>
            <h3>Health Assistant</h3>
            <p>Ask me anything about health</p>
            <StatusIndicator>
              <StatusDot status={connectionStatus} />
              {connectionStatus === 'connected' && 'Online'}
              {connectionStatus === 'disconnected' && 'Offline'}
              {connectionStatus === 'checking' && 'Connecting...'}
            </StatusIndicator>
          </HeaderTitle>
        </HeaderLeft>
        <HeaderActions>
          <MinimizeButton onClick={(e) => {
            e.stopPropagation();
            setIsMinimized(!isMinimized);
          }}>
            {isMinimized ? <FaMinus /> : <FaMinus />}
          </MinimizeButton>
        </HeaderActions>
      </ChatHeader>

      <AnimatePresence>
        {!isMinimized && (
          <ChatBody
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <MessagesContainer>
              {messages.map((message) => (
                <Message key={message.id} isUser={message.isUser}>
                  <MessageAvatar isUser={message.isUser}>
                    {message.isUser ? <FaUser /> : <FaRobot />}
                  </MessageAvatar>
                  <MessageContent isUser={message.isUser}>
                    {message.text}
                  </MessageContent>
                </Message>
              ))}
              
              {isLoading && (
                <Message>
                  <MessageAvatar>
                    <FaRobot />
                  </MessageAvatar>
                  <TypingIndicator>
                    <TypingDot
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                    />
                    <TypingDot
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                    />
                    <TypingDot
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                    />
                  </TypingIndicator>
                </Message>
              )}
              <div ref={messagesEndRef} />
            </MessagesContainer>

            <InputContainer>
              <MessageInput
                type="text"
                placeholder="Ask a health question..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
              />
              <SendButton onClick={handleSendMessage} disabled={isLoading || !inputMessage.trim()}>
                <FaPaperPlane />
              </SendButton>
            </InputContainer>
          </ChatBody>
        )}
      </AnimatePresence>
    </ChatbotContainer>
  );
};

export default HealthChatbot;
