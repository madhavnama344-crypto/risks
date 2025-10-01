import React from 'react';
import { Search, MessageCircle, Settings, HelpCircle, User, Plus, Clock } from 'lucide-react';

interface ChatHistorySidebarProps {
  currentChatSummary: string;
}

const ChatHistorySidebar: React.FC<ChatHistorySidebarProps> = ({ currentChatSummary }) => {
  const historyItems = [
    { id: 1, title: 'Marine Species Analysis', time: '2 hours ago', active: false },
    { id: 2, title: 'Ocean Temperature Data', time: '1 day ago', active: false },
    { id: 3, title: 'eDNA Sample Results', time: '3 days ago', active: false },
    { id: 4, title: 'Fisheries Stock Assessment', time: '1 week ago', active: false },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-8 h-8 bg-gradient-to-br from-ocean-500 to-aqua-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">S</span>
          </div>
          <span className="font-semibold text-gray-900">Shark AI</span>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search conversations..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <button className="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-gray-50 rounded-lg transition-colors">
            <Plus className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">New Chat</span>
          </button>
        </div>

        {/* Main Navigation */}
        <div className="px-4 mb-6">
          <div className="flex items-center space-x-3 px-3 py-2 bg-ocean-50 text-ocean-700 rounded-lg">
            <MessageCircle className="w-4 h-4" />
            <span className="text-sm font-medium">AI Chat</span>
          </div>
        </div>

        {/* History Section */}
        <div className="px-4">
          <div className="flex items-center space-x-2 mb-3">
            <Clock className="w-4 h-4 text-gray-400" />
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">History</h3>
          </div>
          
          <div className="space-y-1">
            {/* Current active chat */}
            {currentChatSummary && (
              <div className="px-3 py-2 bg-gray-100 rounded-lg">
                <div className="text-sm font-medium text-gray-900 truncate">
                  {currentChatSummary}
                </div>
                <div className="text-xs text-gray-500">Active now</div>
              </div>
            )}
            
            {/* Previous chats */}
            {historyItems.map((item) => (
              <button
                key={item.id}
                className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors group"
              >
                <div className="text-sm text-gray-700 truncate group-hover:text-gray-900">
                  {item.title}
                </div>
                <div className="text-xs text-gray-500">{item.time}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Settings & Help */}
      <div className="border-t border-gray-200 p-4">
        <div className="space-y-1">
          <button className="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-gray-50 rounded-lg transition-colors">
            <Settings className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-700">Settings</span>
          </button>
          <button className="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-gray-50 rounded-lg transition-colors">
            <HelpCircle className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-700">Help & Support</span>
          </button>
        </div>
        
        {/* User Profile */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center space-x-3 px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
            <div className="w-8 h-8 bg-gradient-to-br from-ocean-400 to-aqua-400 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-gray-900 truncate">Marine Researcher</div>
              <div className="text-xs text-gray-500">researcher@marine.org</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatHistorySidebar;