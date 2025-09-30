import React, { useState } from 'react';
import { Send, Bot, User, Database, Fish, Dna, Map, BarChart3 } from 'lucide-react';
import { aiService, type ChatMessage } from '../services/aiService';
import ChatHistorySidebar from '../components/ChatHistorySidebar';

// --- Advanced Helper Function to Parse Markdown (No changes needed here) ---
const parseMarkdown = (text: string) => {
  const lines = text.split('\n');
  const htmlElements = [];
  let inList = false;
  let inOrderedList = false;
  let inTable = false;

  const closeLists = () => {
    if (inList) htmlElements.push('</ul>');
    if (inOrderedList) htmlElements.push('</ol>');
    inList = false;
    inOrderedList = false;
  };

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];

    // Table handling
    if (line.trim().startsWith('|')) {
      if (!inTable) {
        const nextLine = lines[i + 1];
        if (nextLine && nextLine.trim().includes('---')) {
          closeLists();
          inTable = true;
          htmlElements.push('<table class="w-full text-left border-collapse my-2">');
          const headers = line.split('|').slice(1, -1).map(h => h.trim());
          htmlElements.push('<thead><tr class="bg-gray-100 border-b">');
          headers.forEach(h => htmlElements.push(`<th class="p-2 font-semibold text-xs">${h}</th>`));
          htmlElements.push('</tr></thead><tbody>');
          i++; // Skip separator line
          continue;
        }
      } else {
        const cells = line.split('|').slice(1, -1).map(c => c.trim().replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'));
        htmlElements.push('<tr class="border-b">');
        cells.forEach(c => htmlElements.push(`<td class="p-2 text-xs">${c}</td>`));
        htmlElements.push('</tr>');
        continue;
      }
    } else if (inTable) {
      htmlElements.push('</tbody></table>');
      inTable = false;
    }

    // Process **bold** text for all line types
    line = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Headings
    if (line.startsWith('### ')) {
      closeLists();
      htmlElements.push(`<h3 class="font-semibold text-base mt-3 mb-1">${line.substring(4)}</h3>`);
    } else if (line.startsWith('## ')) {
      closeLists();
      htmlElements.push(`<h2 class="font-bold text-lg mt-4 mb-2">${line.substring(3)}</h2>`);
    }
    // Numbered Lists (e.g., 1. Item)
    else if (/^\d+\.\s/.test(line.trim())) {
      if (inList) closeLists();
      if (!inOrderedList) {
        htmlElements.push('<ol class="list-decimal list-inside space-y-1 my-2">');
        inOrderedList = true;
      }
      htmlElements.push(`<li>${line.trim().substring(line.trim().indexOf(' ') + 1)}</li>`);
    }
    // Nested Unordered Lists (e.g.,   + Item)
    else if (line.trim().startsWith('+ ')) {
        if (!inList) { // Should be inside a parent list, but handle gracefully
           htmlElements.push('<ul class="list-inside space-y-1 my-2">');
           inList = true;
        }
        htmlElements.push(`<li class="ml-4"><ul class="list-disc list-inside"><li>${line.trim().substring(2)}</li></ul></li>`);
    }
    // Unordered Lists (e.g., - Item or * Item)
    else if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
      if (inOrderedList) closeLists();
      if (!inList) {
        htmlElements.push('<ul class="list-disc list-inside space-y-1 my-2">');
        inList = true;
      }
      htmlElements.push(`<li>${line.trim().substring(2)}</li>`);
    }
    // Paragraphs and blank lines
    else {
      closeLists();
      if (line.trim() !== '') {
        htmlElements.push(`<p>${line}</p>`);
      }
    }
  }

  closeLists();
  if (inTable) htmlElements.push('</tbody></table>');

  return { __html: htmlElements.join('') };
};


const AI = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: 'Hello! I\'m Shark AI, your marine data assistant.',
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);

  const quickActions = [
    { 
      icon: Database, 
      label: 'Find Datasets', 
      query: 'Show me available marine datasets',
      color: 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100'
    },
    { 
      icon: Fish, 
      label: 'Identify Species', 
      query: 'Help me identify a marine species',
      color: 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100'
    },
    { 
      icon: Dna, 
      label: 'Analyze eDNA', 
      query: 'Explain eDNA analysis results',
      color: 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100'
    },
    { 
      icon: Map, 
      label: 'Ocean Mapping', 
      query: 'Show me ocean temperature patterns',
      color: 'bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100'
    },
    { 
      icon: BarChart3, 
      label: 'Generate a Table', 
      query: 'Generate a sample table of fish populations in the Indian Ocean',
      color: 'bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100'
    }
  ];

  // Get current chat summary for sidebar
  const currentChatSummary = messages.find(msg => msg.type === 'user')?.content.slice(0, 50) + '...' || '';

  const handleNewChat = () => {
    // Save current chat to history if it has user messages
    if (messages.some(msg => msg.type === 'user')) {
      const chatSummary = messages.find(msg => msg.type === 'user')?.content.slice(0, 50) + '...' || 'New Chat';
      const newChatHistory = {
        id: Date.now(),
        title: chatSummary,
        messages: [...messages],
        timestamp: new Date().toLocaleTimeString()
      };
      setChatHistory(prev => [newChatHistory, ...prev]);
    }
    
    // Reset to initial state
    setMessages([
      {
        id: 1,
        type: 'bot',
        content: 'Hello! I\'m Shark AI, your marine data assistant.',
        timestamp: new Date().toLocaleTimeString()
      }
    ]);
    setInputMessage('');
    setError(null);
    setCurrentChatId(null);
  };

  const handleSelectChat = (chatId: number) => {
    // Find the chat in history and load it
    const selectedChat = chatHistory.find(chat => chat.id === chatId);
    if (selectedChat) {
      setMessages(selectedChat.messages);
      setCurrentChatId(chatId);
      setInputMessage('');
      setError(null);
    } else {
      // For demo purposes, load some sample chat data
      const sampleChats = {
        1: [
          { id: 1, type: 'bot', content: 'Hello! I\'m Shark AI, your marine data assistant.', timestamp: new Date().toLocaleTimeString() },
          { id: 2, type: 'user', content: 'Tell me about marine species analysis', timestamp: new Date().toLocaleTimeString() },
          { id: 3, type: 'bot', content: 'Marine species analysis involves studying biodiversity, population dynamics, and ecological relationships in marine ecosystems. We use various methods including eDNA sampling, visual surveys, and acoustic monitoring.', timestamp: new Date().toLocaleTimeString() }
        ],
        2: [
          { id: 1, type: 'bot', content: 'Hello! I\'m Shark AI, your marine data assistant.', timestamp: new Date().toLocaleTimeString() },
          { id: 2, type: 'user', content: 'Show me ocean temperature patterns', timestamp: new Date().toLocaleTimeString() },
          { id: 3, type: 'bot', content: 'Ocean temperature patterns vary by depth, season, and geographic location. Surface temperatures are generally warmer and more variable, while deep ocean temperatures remain relatively stable around 2-4°C.', timestamp: new Date().toLocaleTimeString() }
        ],
        3: [
          { id: 1, type: 'bot', content: 'Hello! I\'m Shark AI, your marine data assistant.', timestamp: new Date().toLocaleTimeString() },
          { id: 2, type: 'user', content: 'Explain eDNA analysis results', timestamp: new Date().toLocaleTimeString() },
          { id: 3, type: 'bot', content: 'eDNA (environmental DNA) analysis detects genetic material shed by organisms into their environment. This technique allows us to identify species presence without direct observation, making it valuable for biodiversity monitoring.', timestamp: new Date().toLocaleTimeString() }
        ],
        4: [
          { id: 1, type: 'bot', content: 'Hello! I\'m Shark AI, your marine data assistant.', timestamp: new Date().toLocaleTimeString() },
          { id: 2, type: 'user', content: 'Help with fisheries stock assessment', timestamp: new Date().toLocaleTimeString() },
          { id: 3, type: 'bot', content: 'Fisheries stock assessment evaluates fish population health and sustainability. Key metrics include biomass, recruitment rates, fishing mortality, and maximum sustainable yield (MSY).', timestamp: new Date().toLocaleTimeString() }
        ]
      };
      
      if (sampleChats[chatId]) {
        setMessages(sampleChats[chatId]);
        setCurrentChatId(chatId);
        setInputMessage('');
        setError(null);
      }
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    setError(null);
    const newMessage = {
      id: messages.length + 1,
      type: 'user',
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const chatHistory: ChatMessage[] = messages
        .filter(msg => msg.type !== 'bot' || msg.id !== 1)
        .map(msg => ({
          role: msg.type === 'user' ? 'user' : 'assistant',
          content: msg.content
        }));
      
      chatHistory.push({
        role: 'user',
        content: inputMessage
      });

      const response = await aiService.sendMessage(chatHistory);
      
      const botResponse = {
        id: messages.length + 2,
        type: 'bot',
        content: response,
        timestamp: new Date().toLocaleTimeString()
      };
      
      setMessages(prev => [...prev, botResponse]);
    } catch (err) {
      console.error('Error getting AI response:', err);
      const errorMessage = err instanceof Error ? err.message : 'An error occurred while processing your request.';
      setError(errorMessage);
      
      const errorResponse = {
        id: messages.length + 2,
        type: 'bot',
        content: `I apologize, but I encountered an error: ${errorMessage}. Please try again or contact support if the issue persists.`,
        timestamp: new Date().toLocaleTimeString()
      };
      
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickAction = (query: string) => {
    setInputMessage(query);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const hasUserMessages = messages.some(msg => msg.type === 'user');

  return (
    // CHANGE 1: Use h-screen instead of min-h-screen to fix the height and prevent scrolling
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <ChatHistorySidebar 
        currentChatSummary={currentChatSummary} 
        onNewChat={handleNewChat}
        onSelectChat={handleSelectChat}
      />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-white rounded-l-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">AI Chat</h1>
              <p className="text-sm text-gray-500">Marine data analysis and insights</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-sm text-gray-500">Online</span>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden"> {/* Added overflow-hidden */}
          {!hasUserMessages ? (
            /* Welcome Screen */
            <div className="flex-1 flex flex-col items-center justify-center p-8 overflow-y-auto">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-ocean-500 to-aqua-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Bot className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to Shark AI</h2>
                <p className="text-gray-600 max-w-md">
                  Get comprehensive marine data analysis and ocean insights. Choose an option below to get started.
                </p>
              </div>

              {/* Quick Actions Grid */}
              {/* CHANGE 2: Made the grid container smaller and reduced the gap */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-w-3xl w-full">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickAction(action.query)}
                    // CHANGE 3: Reduced padding, border width, and added flex layout for better alignment
                    className={`p-4 rounded-xl border transition-all duration-200 text-left hover:shadow-md flex flex-col ${action.color}`}
                  >
                    {/* CHANGE 4: Made the icon smaller */}
                    <action.icon className="w-6 h-6 mb-2" />
                    {/* CHANGE 5: Made the label text slightly smaller */}
                    <h3 className="font-semibold text-sm mb-1">{action.label}</h3>
                    {/* CHANGE 6: Made the description text smaller */}
                    <p className="text-xs opacity-75">
                      {action.query}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Chat Messages */
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.slice(1).map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start space-x-3 ${
                    message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.type === 'user' 
                      ? 'bg-gradient-to-br from-ocean-500 to-aqua-500' 
                      : 'bg-gray-100'
                  }`}>
                    {message.type === 'user' ? (
                      <User className="w-4 h-4 text-white" />
                    ) : (
                      <Bot className="w-4 h-4 text-gray-600" />
                    )}
                  </div>
                  <div className={`max-w-3xl px-4 py-3 rounded-2xl ${
                    message.type === 'user'
                      ? 'bg-gradient-to-br from-ocean-500 to-aqua-500 text-white'
                      : 'bg-gray-50 text-gray-900'
                  }`}>
                    <div
                      className="text-sm prose max-w-none"
                      dangerouslySetInnerHTML={parseMarkdown(message.content)}
                    />
                    <p className={`text-xs mt-2 ${
                      message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-gray-600" />
                  </div>
                  <div className="bg-gray-50 px-4 py-3 rounded-2xl">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Input Area */}
          <div className="border-t border-gray-200 p-6">
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm">
                  <strong>Error:</strong> {error}
                </p>
              </div>
            )}
            <div className="flex items-end space-x-4">
              <div className="flex-1">
                <textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me about marine data, species identification, or ocean insights..."
                  // CHANGE 7: Reduced rows to make the input area shorter
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:border-transparent resize-none"
                  rows={2}
                />
              </div>
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
                className="bg-gradient-to-br from-ocean-500 to-aqua-500 text-white p-3 rounded-xl hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Powered by adil 
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AI;