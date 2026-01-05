import React from 'react'
import './SideMenu.css'

const SideMenu = ({ onNewChat, conversations = [], currentConversationId, onSelectConversation, onDeleteConversation })=> {
  
  const getConversationTitle = (conv) => {
    if (conv.messages.length > 1) {
      const firstUserMsg = conv.messages.find(m => m.user === 'me')
      if (firstUserMsg) {
        return firstUserMsg.message.slice(0, 30) + (firstUserMsg.message.length > 30 ? '...' : '')
      }
    }
    return 'Nova conversa'
  }

  return(
    <aside className='side-menu'>
      <div className='side-menu-button' onClick={onNewChat}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
        Novo chat
      </div>

      <div className='conversations-list'>
        {conversations.map((conv) => (
          <div 
            key={conv.id}
            className={`conversation-item ${conv.id === currentConversationId ? 'active' : ''}`}
          >
            <div 
              className='conversation-title'
              onClick={() => onSelectConversation(conv.id)}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
              <span>{getConversationTitle(conv)}</span>
            </div>
            <button 
              className='delete-button'
              onClick={(e) => {
                e.stopPropagation();
                onDeleteConversation(conv.id)
              }}
              title='Deletar conversa'
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            </button>
          </div>
        ))}
      </div>
    </aside>
  )
}

export default SideMenu