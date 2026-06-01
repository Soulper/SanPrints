import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import puter from '@heyputer/puter.js'

const suggestions = [
  'How do I grow my YouTube channel?',
  'How to get out of view jail?',
  'Best hooks for TikTok?',
  'How to warm up an Instagram account?',
  'Tips for Instagram Reels?',
]

export default function AIChatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Hey! Ask me anything about the blueprints — growth tips, hooks, view jail fixes, and more.' },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [fullKnowledge, setFullKnowledge] = useState('')
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    fetch('/blueprints-content.txt')
      .then((r) => r.text())
      .then((text) => setFullKnowledge(text))
      .catch(() => {})
  }, [])

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = useCallback(async (text) => {
    const q = text.trim()
    if (!q || loading) return

    setMessages((prev) => [...prev, { role: 'user', text: q }])
    setInput('')
    setLoading(true)

    try {
      const chatHistory = messages
        .filter((m) => m.role !== 'ai' || m.text !== messages[0]?.text)
        .slice(-8)
        .map((m) => ({ role: m.role === 'ai' ? 'assistant' : 'user', content: m.text }))

      const systemMsg = `You are an expert social media growth strategist. You have deep knowledge of the San Blueprints — a collection of battle-tested growth frameworks for YouTube, TikTok, Instagram, and short-form content.

Your knowledge base includes these complete blueprints:
- YouTube Warm Up Blueprint
- Escape View Jail Blueprint
- The Ultimate Whop Clipping Blueprint
- Ultimate Instagram Blueprint
- Ultimate TikTok Growth Blueprint (2026)
- Viral Hook Blueprint

Here is the full content of every blueprint for reference:

${fullKnowledge}

Instructions:
- Answer STRICTLY based on the blueprint content above. Quote specific strategies, metrics, and frameworks.
- Always sound confident and authoritative — you are a specialist who has studied these blueprints inside out.
- Structure every answer like this:
  📌 **Quick Summary** → 1 sentence
  🛠 **Step-by-Step** → numbered steps or bullet points from the blueprints
  📊 **Key Metrics/Targets** → specific numbers from the blueprints (CTR, retention%, timing, etc.)
  💡 **Pro Tip** → one actionable takeaway
- Use bullet points, **bold** for key terms/numbers, and line breaks.
- If the user asks something outside the blueprints, politely redirect to what the blueprints cover.`

      const response = await puter.ai.chat([
        { role: 'system', content: systemMsg },
        ...chatHistory,
        { role: 'user', content: q },
      ], { model: 'gpt-4o-mini' })

      setMessages((prev) => [...prev, { role: 'ai', text: response?.message?.content || response?.toString() || 'No response.' }])
    } catch (err) {
      setMessages((prev) => [...prev, { role: 'ai', text: `Error: ${err.message}. Make sure you're signed in to Puter (a popup should appear).` }])
    }
    setLoading(false)
  }, [loading, fullKnowledge, messages])

  return (
    <>
      <button
        className={`chatbot-fab ${open ? 'chatbot-fab-open' : ''}`}
        onClick={() => setOpen((o) => !o)}
        aria-label="Toggle AI Chat"
      >
        {open ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="chatbot-modal"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className="chatbot-header">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
              <span>Blueprint AI <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginLeft: 6 }}>powered by Puter</span></span>
            </div>

            <div className="chatbot-body">
              {messages.map((msg, i) => (
                <div key={i} className={`chatbot-msg chatbot-msg-${msg.role}`}>
                  {msg.role === 'ai' && (
                    <div className="chatbot-avatar">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
                    </div>
                  )}
                  <div className="chatbot-bubble">
                    {msg.text.split('\n').map((line, j) => (
                      <span key={j}>{line}<br /></span>
                    ))}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="chatbot-msg chatbot-msg-ai">
                  <div className="chatbot-avatar">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
                  </div>
                  <div className="chatbot-bubble chatbot-typing">
                    <span className="chatbot-dot" /><span className="chatbot-dot" /><span className="chatbot-dot" />
                  </div>
                </div>
              )}

              {messages.length === 1 && !loading && (
                <div className="chatbot-suggestions">
                  {suggestions.map((s, i) => (
                    <button key={i} className="chatbot-suggestion" onClick={() => handleSend(s)}>
                      {s}
                    </button>
                  ))}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <form
              className="chatbot-footer"
              onSubmit={(e) => {
                e.preventDefault()
                handleSend(input)
              }}
            >
              <input
                ref={inputRef}
                className="chatbot-input"
                type="text"
                placeholder="Ask about the blueprints..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={loading}
              />
              <button className="chatbot-send" type="submit" disabled={!input.trim() || loading}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
