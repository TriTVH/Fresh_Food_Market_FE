import { useState, useRef, useEffect } from 'react'
import { FiMessageCircle, FiX, FiSend } from 'react-icons/fi'
import { useAuth } from '@/context/AuthContext'

const PRIMARY = '#75b06f'
const PRIMARY_DARK = '#5a9450'

const BOT_AVATAR = (
  <div style={{ width: 32, height: 32, borderRadius: '50%', background: `linear-gradient(135deg,${PRIMARY},${PRIMARY_DARK})`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
    <FiMessageCircle style={{ color: '#fff', fontSize: 15 }} />
  </div>
)

const INITIAL_MESSAGES = [
  { id: 1, from: 'bot', text: 'Xin chào! Chúng tôi có thể giúp gì cho bạn? 😊', time: null },
]

function formatTime(date) {
  return date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
}

const BOT_RESPONSES = [
  'Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong vòng 30 giây. 🙏',
  'Bạn có thể mô tả thêm vấn đề để chúng tôi hỗ trợ tốt hơn không?',
  'Hiện tại chúng tôi đang xử lý yêu cầu của bạn, vui lòng chờ trong giây lát! ⏳',
  'Để biết thêm thông tin, bạn có thể gọi hotline: 1800-FRESH hoặc email support@freshmarket.vn',
  'Chúng tôi rất vui khi được phục vụ bạn! Còn điều gì bạn muốn hỏi không? 😊',
]
let responseIdx = 0

export default function FloatingChatButton() {
  const { currentUser } = useAuth()
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState(INITIAL_MESSAGES)
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [unread, setUnread] = useState(1)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  // Scroll to bottom on new message
  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, open])

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setUnread(0)
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [open])

  const sendMessage = () => {
    const text = input.trim()
    if (!text) return
    const now = new Date()
    setMessages((prev) => [...prev, { id: Date.now(), from: 'user', text, time: formatTime(now) }])
    setInput('')
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      const reply = BOT_RESPONSES[responseIdx % BOT_RESPONSES.length]
      responseIdx++
      setMessages((prev) => [...prev, { id: Date.now() + 1, from: 'bot', text: reply, time: formatTime(new Date()) }])
      if (!open) setUnread((n) => n + 1)
    }, 1200)
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() }
  }

  const userName = currentUser?.name?.split(' ').pop() || 'Bạn'

  return (
    <>
      {/* Chat Window */}
      {open && (
        <div style={{
          position: 'fixed', bottom: 88, right: 24, width: 360, height: 500,
          borderRadius: 16, background: '#fff', boxShadow: '0 12px 48px rgba(0,0,0,0.2)',
          display: 'flex', flexDirection: 'column', zIndex: 1000, overflow: 'hidden',
          animation: 'chatFadeIn 0.22s ease',
        }}>
          {/* Header */}
          <div style={{ background: `linear-gradient(135deg,${PRIMARY},${PRIMARY_DARK})`, padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FiMessageCircle style={{ color: '#fff', fontSize: 20 }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 800, color: '#fff', fontSize: 14.5 }}>Fresh Market Support</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 2 }}>
                <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#4ade80' }} />
                <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: 12 }}>Online</span>
              </div>
            </div>
            <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.8)', fontSize: 18, lineHeight: 1, padding: 4 }}>
              <FiX />
            </button>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '16px 14px', display: 'flex', flexDirection: 'column', gap: 12, background: '#f8fafc' }}>
            {messages.map((msg) => (
              <div key={msg.id} style={{ display: 'flex', flexDirection: msg.from === 'user' ? 'row-reverse' : 'row', alignItems: 'flex-end', gap: 8 }}>
                {msg.from === 'bot' && BOT_AVATAR}
                {msg.from === 'user' && (
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: 700, fontSize: 13, color: '#64748b' }}>
                    {userName[0]}
                  </div>
                )}
                <div style={{ maxWidth: '72%' }}>
                  <div style={{
                    padding: '10px 14px', borderRadius: msg.from === 'bot' ? '4px 14px 14px 14px' : '14px 4px 14px 14px',
                    background: msg.from === 'bot' ? '#fff' : `linear-gradient(135deg,${PRIMARY},${PRIMARY_DARK})`,
                    color: msg.from === 'bot' ? '#374151' : '#fff',
                    fontSize: 13.5, lineHeight: 1.5, fontWeight: msg.from === 'bot' ? 500 : 600,
                    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                  }}>
                    {msg.text}
                  </div>
                  {msg.time && (
                    <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 3, textAlign: msg.from === 'user' ? 'right' : 'left', paddingLeft: msg.from === 'bot' ? 4 : 0, paddingRight: msg.from === 'user' ? 4 : 0 }}>
                      {msg.time}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {/* Typing indicator */}
            {typing && (
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
                {BOT_AVATAR}
                <div style={{ padding: '10px 16px', borderRadius: '4px 14px 14px 14px', background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                  <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                    {[0, 1, 2].map((i) => (
                      <div key={i} style={{ width: 7, height: 7, borderRadius: '50%', background: '#94a3b8', animation: `typingDot 1.2s ${i * 0.2}s infinite` }} />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div style={{ padding: '10px 14px', background: '#fff', borderTop: '1px solid #f1f5f9' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#f8fafc', borderRadius: 24, border: '1.5px solid #e2e8f0', padding: '6px 8px 6px 16px' }}>
              <input ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKey}
                placeholder="Nhập tin nhắn..."
                style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontSize: 13.5, color: '#374151' }} />
              <button onClick={sendMessage} disabled={!input.trim()}
                style={{ width: 34, height: 34, borderRadius: '50%', border: 'none', background: input.trim() ? `linear-gradient(135deg,${PRIMARY},${PRIMARY_DARK})` : '#e2e8f0', color: input.trim() ? '#fff' : '#94a3b8', cursor: input.trim() ? 'pointer' : 'default', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.2s' }}>
                <FiSend style={{ fontSize: 15, marginLeft: 1 }} />
              </button>
            </div>
            <div style={{ textAlign: 'center', fontSize: 11.5, color: '#94a3b8', marginTop: 6 }}>Thời gian phản hồi: ~30 giây</div>
          </div>
        </div>
      )}

      {/* FAB button */}
      <button onClick={() => setOpen((v) => !v)}
        style={{
          position: 'fixed', bottom: 24, right: 24, width: 56, height: 56,
          background: open ? '#64748b' : `linear-gradient(135deg,${PRIMARY},${PRIMARY_DARK})`,
          border: 'none', borderRadius: '50%', cursor: 'pointer', zIndex: 1001,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 16px rgba(117,176,111,0.45)',
          transition: 'all 0.25s', transform: open ? 'rotate(0deg)' : 'rotate(0deg)',
        }}
        aria-label="Chat với chúng tôi">
        {open
          ? <FiX style={{ color: '#fff', fontSize: 22 }} />
          : <FiMessageCircle style={{ color: '#fff', fontSize: 22 }} />
        }
        {!open && unread > 0 && (
          <span style={{ position: 'absolute', top: -2, right: -2, width: 20, height: 20, background: '#ef4444', color: '#fff', fontSize: 11, fontWeight: 700, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #fff' }}>
            {unread}
          </span>
        )}
      </button>

      <style>{`
        @keyframes chatFadeIn {
          from { opacity: 0; transform: translateY(12px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes typingDot {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.5; }
          30% { transform: translateY(-5px); opacity: 1; }
        }
      `}</style>
    </>
  )
}
