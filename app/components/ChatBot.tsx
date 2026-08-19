"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../chatbot.css";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const SUGGESTIONS = [
  "Recommend a book for a 14-year-old",
  "I loved Harry Potter, what's next?",
  "Best mystery books for teens",
  "Something cozy to read tonight",
];

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! I'm Maya, your reading companion 📚 Tell me your mood, a book you loved, or a genre — and I'll find your next great read!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => inputRef.current?.focus(), 100);
      setHasNewMessage(false);
    }
  }, [open, messages]);

  async function sendMessage(content: string) {
    if (!content.trim() || loading) return;
    const userMessage: Message = { role: "user", content: content.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();

if (!res.ok) {
  throw new Error(data.error || "Maya could not respond.");
}

const reply = data.reply || "Sorry, I couldn't get a response. Try again!";
      setMessages(prev => [...prev, { role: "assistant", content: reply }]);
      if (!open) setHasNewMessage(true);
    } catch {
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "Oops! Something went wrong. Please try again in a moment.",
      }]);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  function clearChat() {
    setMessages([{
      role: "assistant",
      content: "Hi! I'm Maya, your reading companion 📚 Tell me your mood, a book you loved, or a genre — and I'll find your next great read!",
    }]);
  }

  return (
    <>
      <div className="chatbot-fab-wrap">
        <AnimatePresence>
          {!open && hasNewMessage && (
            <motion.div
              className="chatbot-new-badge"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            >
              1
            </motion.div>
          )}
        </AnimatePresence>
        <motion.button
          className={`chatbot-fab ${open ? "chatbot-fab-open" : ""}`}
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close reading assistant" : "Open reading assistant"}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
        >
          <AnimatePresence mode="wait">
            {open ? (
              <motion.span
                key="close"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                {"✕"}
              </motion.span>
            ) : (
              <motion.span
                key="open"
                initial={{ opacity: 0, rotate: 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -90 }}
                transition={{ duration: 0.2 }}
              >
                {"📚"}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
        {!open && (
          <motion.div
            className="chatbot-tooltip"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5 }}
          >
            Ask Maya anything about books!
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="chatbot-panel"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <div className="chatbot-header">
              <div className="chatbot-header-info">
                <div className="chatbot-avatar">M</div>
                <div>
                  <strong>Maya</strong>
                  <span>Your reading companion</span>
                </div>
              </div>
              <div className="chatbot-header-actions">
                <button
                  onClick={clearChat}
                  className="chatbot-clear"
                  aria-label="Clear chat"
                  title="Clear chat"
                >
                  {"↺"}
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="chatbot-close-btn"
                  aria-label="Close chat"
                >
                  {"✕"}
                </button>
              </div>
            </div>

            <div className="chatbot-messages">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  className={`chatbot-msg ${msg.role === "user" ? "chatbot-msg-user" : "chatbot-msg-ai"}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {msg.role === "assistant" && (
                    <div className="chatbot-msg-avatar">M</div>
                  )}
                  <div className="chatbot-msg-bubble">
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              {loading && (
                <div className="chatbot-msg chatbot-msg-ai">
                  <div className="chatbot-msg-avatar">M</div>
                  <div className="chatbot-msg-bubble chatbot-typing">
                    <span /><span /><span />
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {messages.length === 1 && (
              <div className="chatbot-suggestions">
                {SUGGESTIONS.map(s => (
                  <button
                    key={s}
                    className="chatbot-suggestion"
                    onClick={() => sendMessage(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            <div className="chatbot-input-wrap">
              <input
                ref={inputRef}
                className="chatbot-input"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about books, genres, moods..."
                aria-label="Message Maya"
                disabled={loading}
              />
              <button
                className="chatbot-send"
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || loading}
                aria-label="Send message"
              >
                {"→"}
              </button>
            </div>
            <p className="chatbot-footer-note">
              Powered by Maya {"·"} Mayu&apos;s Library AI
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}