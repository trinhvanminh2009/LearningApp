import _service from './_service'

const conversationActionPost = ({ action, conversationId, }) => (
  _service.post(`/api/Conversation/action`, {
    action,
    conversationId,
  })
)

const conversationContactGet = ({ contactId, }) => (
  _service.get(`/api/Conversation/contact/${contactId}`)
)

const conversationItemGet = ({ conversationId, }) => (
  _service.get(`/api/Conversation/${conversationId}`)
)

const conversationGet = ({ keyword, }) => {
  return (_service.get('/api/Conversation', { keyword, }))
}

const messagesGet = ({ ConversationId, lastMessageTime, }) => (
  _service.get('/api/Conversation/messages', {
    ConversationId,
    lastMessageTime: lastMessageTime || undefined,
  })
)

const messagesPost = ({ body, }) => {
  return (_service.post('/api/Conversation/messages', body))
}

export default {
  conversationActionPost,
  conversationContactGet,
  conversationGet,
  messagesGet,
  messagesPost,
  conversationItemGet,
}
