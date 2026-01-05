import './styles/App.css';
import './styles/reset.css';
import { useState, useEffect, useRef} from 'react';

import SideMenu from './components/SideMenu/SideMenu'
import ChatMessage from './components/ChatMessage/ChatMessage'
import { INITIAL_MESSAGE, STORAGE_KEYS } from './config/constants'
import { 
  sendMessageToGPT, 
  createNewConversation, 
  findLastUserMessage, 
  removeLastGPTMessage 
} from './utils/chatHelpers'

function App() {

  const [input, setInput] = useState("")
  const [chatLog, setChatLog] = useState([INITIAL_MESSAGE])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [conversations, setConversations] = useState([])
  const [currentConversationId, setCurrentConversationId] = useState(null)
  const chatLogRef = useRef(null)


  // Carrega conversas do localStorage ao iniciar
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CONVERSATIONS)
    if (saved) {
      const parsed = JSON.parse(saved)
      setConversations(parsed)
      if (parsed.length > 0) {
        const lastConv = parsed[parsed.length - 1]
        setCurrentConversationId(lastConv.id)
        setChatLog(lastConv.messages)
      }
    }
  }, [])

  useEffect(() => {
    if (conversations.length > 0) {
      localStorage.setItem(STORAGE_KEYS.CONVERSATIONS, JSON.stringify(conversations))
    }
  }, [conversations])

  // Atualiza conversa atual quando chatLog muda
  useEffect(() => {
    if (currentConversationId && chatLog.length > 1) {
      setConversations(prev => 
        prev.map(conv => 
          conv.id === currentConversationId 
            ? { ...conv, messages: chatLog, updatedAt: new Date().toISOString() }
            : conv
        )
      )
    }
  }, [chatLog, currentConversationId])


  async function handleSubmit(e) {
    e.preventDefault();
    
    if (!input.trim()) return;

    setError(null);
    setIsLoading(true);

    const newChatLog = [...chatLog, {
      user: 'me', 
      message: input
    }];
    setChatLog(newChatLog);
    const currentInput = input;
    setInput("");

    const result = await sendMessageToGPT(currentInput);
    
    if (result.success) {
      setChatLog([...newChatLog, {
        user: 'gpt', 
        message: result.data
      }])
    } else {
      setError(result.error);
      setChatLog([...newChatLog, {
        user: 'gpt', 
        message: result.error
      }])
    }
    
    setIsLoading(false);
  }

  async function handleRegenerateResponse() {
    if (chatLog.length < 2) return;
    
    const lastUserMessage = findLastUserMessage(chatLog);
    if (!lastUserMessage) return;

    const newChatLog = removeLastGPTMessage(chatLog);
    
    setChatLog(newChatLog);
    setIsLoading(true);
    setError(null);

    const result = await sendMessageToGPT(lastUserMessage);
    
    if (result.success) {
      setChatLog([...newChatLog, {
        user: 'gpt', 
        message: result.data
      }])
    } else {
      setChatLog([...newChatLog, {
        user: 'gpt', 
        message: result.error
      }])
    }
    
    setIsLoading(false);
  }

  function handleNewChat() {
    const newConversation = createNewConversation();
    
    setConversations(prev => [...prev, newConversation])
    setCurrentConversationId(newConversation.id)
    setChatLog(newConversation.messages);
    setInput("");
    setError(null);
  }

  function handleSelectConversation(convId) {
    const conv = conversations.find(c => c.id === convId)
    if (conv) {
      setCurrentConversationId(convId)
      setChatLog(conv.messages)
      setInput("")
      setError(null)
    }
  }

  function handleDeleteConversation(convId) {
    setConversations(prev => prev.filter(c => c.id !== convId))
    
    if (currentConversationId === convId) {
      const remaining = conversations.filter(c => c.id !== convId)
      if (remaining.length > 0) {
        handleSelectConversation(remaining[remaining.length - 1].id)
      } else {
        handleNewChat()
      }
    }
  }

  useEffect(() => {
    if (chatLogRef.current) {
      chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
    }
  }, [chatLog]);

  return (
    <div className='App'>

      <SideMenu 
        onNewChat={handleNewChat}
        conversations={conversations}
        currentConversationId={currentConversationId}
        onSelectConversation={handleSelectConversation}
        onDeleteConversation={handleDeleteConversation}
      />

      <section className='chatbox'>

          <div className='chat-log' ref={chatLogRef}>
            {chatLog.map((message, index)=>(
              <ChatMessage key={index} message={message} />
            ))}
            {isLoading && (
              <ChatMessage 
                message={{
                  user: 'gpt',
                  message: 'Digitando...'
                }} 
              />
            )}
          </div>

          <div className='chat-input-holder'>
            {chatLog.length > 2 && chatLog[chatLog.length - 1].user === 'gpt' && !isLoading && (
              <button 
                className='regenerate-button'
                onClick={handleRegenerateResponse}
              >
                🔄 Regenerar resposta
              </button>
            )}
            <form onSubmit={handleSubmit} className='chat-input-form'>
              <div className='chat-input-wrapper'>
                <textarea
                  rows='1'
                  className='chat-input-textarea'
                  placeholder='Envie uma mensagem...'
                  value={input}
                  onChange={e =>setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit(e);
                    }
                  }}
                  disabled={isLoading}
                />
                <button 
                  type='submit' 
                  className={`send-button ${input.trim() && !isLoading ? 'active' : ''}`}
                  disabled={!input.trim() || isLoading}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 11L12 6L17 11M12 18V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </form>
          </div>
      </section>

    </div>
  );
}

export default App;