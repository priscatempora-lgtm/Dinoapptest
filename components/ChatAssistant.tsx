import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Sparkles, AlertCircle, Info } from 'lucide-react';
import { ChatMessage } from '../types';
import { sendMessageToGemini } from '../services/gemini';
import ReactMarkdown from 'react-markdown';

const ChatAssistant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "Roar! 🦖 I'm **DinoBuddy**, your paleo-pal! Ask me anything about dinosaurs, fossils, or the prehistoric world!",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [noKeyError, setNoKeyError] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
    // Check for API key presence roughly
    if (!process.env.API_KEY) {
        setNoKeyError(true);
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    // Prepare history for API context (exclude errors or welcome if needed, usually include welcome)
    const history = messages.map(m => ({ role: m.role, text: m.text }));

    const responseText = await sendMessageToGemini(input, history);

    const botMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: responseText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botMsg]);
    setIsLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-white md:rounded-2xl overflow-hidden md:shadow-xl md:border md:border-gray-200">
      <div className="bg-dino-green p-4 flex items-center justify-between text-white shadow-md z-10">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-full">
            <Bot size={24} />
          </div>
          <div>
            <h2 className="font-heading text-lg">DinoBuddy AI</h2>
            <p className="text-xs text-white/80 flex items-center gap-1">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              Online & Ready to Learn
            </p>
          </div>
        </div>
      </div>

      {noKeyError && (
          <div className="bg-red-50 p-2 text-xs text-red-600 flex items-center justify-center gap-2 border-b border-red-100">
             <AlertCircle size={14} /> API Key missing. Chat will return default errors.
          </div>
      )}

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] md:max-w-[70%] rounded-2xl p-4 shadow-sm ${
                msg.role === 'user'
                  ? 'bg-dino-orange text-white rounded-tr-none'
                  : 'bg-white border border-gray-100 text-dino-dark rounded-tl-none'
              }`}
            >
               {msg.role === 'model' ? (
                   <div className="prose prose-sm prose-p:my-1 prose-headings:my-2 max-w-none text-dino-dark">
                       <ReactMarkdown>{msg.text}</ReactMarkdown>
                   </div>
               ) : (
                   <p>{msg.text}</p>
               )}
              <span className={`text-[10px] block mt-2 opacity-70 ${msg.role === 'user' ? 'text-right text-white' : 'text-left text-gray-400'}`}>
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-none p-4 shadow-sm flex items-center gap-2">
              <Loader2 size={16} className="animate-spin text-dino-amber" />
              <span className="text-sm text-gray-500 animate-pulse">Thinking about fossils...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white border-t border-gray-100">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about T-Rex, diet, or evolution..."
            className="w-full pl-4 pr-12 py-4 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-dino-green/50 text-dino-dark placeholder:text-gray-400"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="absolute right-2 top-2 p-2 bg-dino-green text-white rounded-lg hover:bg-green-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
          </button>
        </div>
        <p className="text-[10px] text-center text-gray-400 mt-2 flex items-center justify-center gap-1">
          <Sparkles size={10} /> AI can make mistakes. Check important info.
        </p>
      </div>
    </div>
  );
};

export default ChatAssistant;
