import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../../components/Common/PageHeader';
import JetsonNanoArchitectureCard from '../../components/Hardware/JetsonNanoArchitectureCard';
import { useAuth } from '../../context/AuthContext';
import {
  Bot,
  Send,
  Sparkles,
  User,
  ArrowRight,
  BookOpen,
  Award,
  Briefcase,
  Calendar,
  Zap,
  HelpCircle,
  RefreshCw
} from 'lucide-react';
import api from '../../api';

export const UserCareerAssistant = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([
    {
      id: 'm-init',
      sender: 'assistant',
      text: `Hello ${user?.name || 'Rahul'}! I am your **NCCT Cooperative Career Assistant**.

I am configured with domain knowledge covering courses at VAMNICOM, RICMs, and ICMs, state cooperative recruitment rules, and PACS modernization standards.

How can I help guide your training pathway or career progression today?`,
      suggestedActions: [
        { label: 'Recommended Courses', query: 'What courses should I take?' },
        { label: 'Find Cooperative Jobs', query: 'How can I find cooperative sector jobs?' },
        { label: 'Check My Certificates', query: 'What certificates do I have?' },
        { label: 'Upcoming Programmes', query: 'Show me upcoming training programmes' }
      ]
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const quickPrompts = [
    'What courses should I take?',
    'How can I find cooperative sector jobs?',
    'How can I improve my skills?',
    'What certificates do I have?',
    'Show me upcoming training programmes'
  ];

  const handleSendMessage = async (queryText) => {
    const query = queryText || inputQuery;
    if (!query.trim()) return;

    const userMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: query
    };

    setMessages(prev => [...prev, userMessage]);
    setInputQuery('');
    setIsTyping(true);

    try {
      const res = await api.chatWithAssistant(query, {
        userName: user?.name || 'Rahul Sharma',
        institution: user?.institution || 'RICM Patna',
        completedCourses: ['Digital Literacy', 'PACS Operations']
      });

      setTimeout(() => {
        setIsTyping(false);
        if (res && res.data) {
          const assistantReply = {
            id: `a-${Date.now()}`,
            sender: 'assistant',
            text: res.data.reply,
            suggestedActions: res.data.suggestedActions
          };
          setMessages(prev => [...prev, assistantReply]);
        }
      }, 500);
    } catch (e) {
      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [
          ...prev,
          {
            id: `a-${Date.now()}`,
            sender: 'assistant',
            text: 'I can assist you with course selection, certification status, and cooperative job matching. Please pick one of the suggested options below.',
            suggestedActions: [
              { label: 'Recommended Courses', query: 'What courses should I take?' },
              { label: 'Find Cooperative Jobs', query: 'How can I find cooperative sector jobs?' }
            ]
          }
        ]);
      }, 400);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 'm-init',
        sender: 'assistant',
        text: `Chat session reset. How can I assist your cooperative learning pathway?`,
        suggestedActions: [
          { label: 'Recommended Courses', query: 'What courses should I take?' },
          { label: 'Find Cooperative Jobs', query: 'How can I find cooperative sector jobs?' }
        ]
      }
    ]);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="AI Cooperative Career Assistant"
        subtitle="Intelligent advisory simulator trained on NCCT curriculum standards, PACS digitization mandates, and cooperative employment criteria."
        breadcrumbs={[{ label: 'Trainee', link: '/user/dashboard' }, { label: 'Career Assistant' }]}
        actions={
          <button onClick={handleResetChat} className="btn-outline text-xs">
            <RefreshCw className="w-3.5 h-3.5" /> Clear Chat
          </button>
        }
      />

      {/* Jetson Nano Edge AI Architecture Card */}
      <JetsonNanoArchitectureCard />

      {/* Suggested Quick Prompt Chips */}
      <div>
        <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
          Suggested Inquiries:
        </p>
        <div className="flex flex-wrap gap-2">
          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(prompt)}
              className="px-3 py-1.5 rounded-xl bg-white hover:bg-[#EAF5FB] border border-slate-200 text-xs font-semibold text-[#0B2A4A] shadow-xs hover:border-[#1976D2] transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-3 h-3 text-[#1976D2]" />
              <span>{prompt}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat Interface Container */}
      <div className="card-institutional overflow-hidden flex flex-col h-[560px]">
        {/* Chat Header Bar */}
        <div className="px-6 py-3.5 bg-[#0B2A4A] text-white flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#19A7CE]/20 border border-[#19A7CE]/40 flex items-center justify-center text-[#19A7CE]">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">NCCT Intelligent Advisor</h4>
              <p className="text-[10px] text-cyan-300">Cooperative Domain Model v1.0</p>
            </div>
          </div>

          <span className="text-[11px] font-mono text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Edge Simulator Online
          </span>
        </div>

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/50">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';

            return (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-2xl ${isUser ? 'ml-auto flex-row-reverse' : ''}`}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                    isUser
                      ? 'bg-[#1976D2] text-white'
                      : 'bg-[#0B2A4A] text-[#19A7CE] border border-cyan-500/30'
                  }`}
                >
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                {/* Message Bubble */}
                <div className="space-y-2">
                  <div
                    className={`p-4 rounded-2xl text-xs leading-relaxed shadow-subtle ${
                      isUser
                        ? 'bg-[#1976D2] text-white rounded-tr-none font-medium'
                        : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'
                    }`}
                  >
                    <div className="whitespace-pre-line">
                      {msg.text}
                    </div>
                  </div>

                  {/* Optional Action Chips / Direct Navigation */}
                  {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {msg.suggestedActions.map((action, aIdx) => (
                        action.link ? (
                          <Link
                            key={aIdx}
                            to={action.link}
                            className="px-2.5 py-1 rounded-lg bg-[#EAF5FB] hover:bg-[#D4EDFA] border border-[#1976D2]/30 text-[#0B2A4A] text-[11px] font-bold transition-colors flex items-center gap-1"
                          >
                            <span>{action.label}</span>
                            <ArrowRight className="w-3 h-3 text-[#1976D2]" />
                          </Link>
                        ) : (
                          <button
                            key={aIdx}
                            onClick={() => handleSendMessage(action.query)}
                            className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 text-[11px] font-medium transition-colors"
                          >
                            {action.label}
                          </button>
                        )
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex gap-3 max-w-md">
              <div className="w-8 h-8 rounded-full bg-[#0B2A4A] text-[#19A7CE] flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-3.5 bg-white rounded-2xl rounded-tl-none border border-slate-200 shadow-subtle flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce delay-100" />
                <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce delay-200" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-white border-t border-slate-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Ask about courses, qualifications, attendance, or job opportunities..."
              className="flex-1 px-4 py-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#19A7CE] focus:outline-none"
            />

            <button
              type="submit"
              disabled={!inputQuery.trim() || isTyping}
              className="btn-primary px-4 py-2.5 rounded-xl text-xs font-bold disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5"
            >
              <span>Send</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserCareerAssistant;
