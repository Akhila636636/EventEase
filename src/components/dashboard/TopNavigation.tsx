import React from 'react';
import { Calendar, MessageCircle, Plus, User } from 'lucide-react';
import { User as UserType } from '../../App';

interface TopNavigationProps {
  user: UserType;
  onNavigate: (page: string) => void;
}

const TopNavigation: React.FC<TopNavigationProps> = ({ user, onNavigate }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4" style={{ backgroundColor: '#2A2E35' }}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2">
            <Calendar className="text-white" size={28} />
            <span className="text-white text-xl font-bold">EventEase</span>
          </div>
          
          <div className="flex items-center space-x-6">
            <button
              onClick={() => onNavigate('dashboard')}
              className="text-white hover:text-gray-300 transition-colors font-medium"
            >
              Dashboard
            </button>
            <button className="text-white hover:text-gray-300 transition-colors font-medium">
              <MessageCircle size={20} className="inline mr-2" />
              Chat with us
            </button>
            <button
              onClick={() => onNavigate('organizer-dashboard')}
              className="text-white hover:text-gray-300 transition-colors font-medium"
            >
              <Plus size={20} className="inline mr-2" />
              Organize
            </button>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="text-white text-sm">
            <div>{user.name}</div>
            <div className="text-gray-300 text-xs">{user.rollNumber}</div>
          </div>
          <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#7B8FA1' }}>
            <User size={18} className="text-white" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNavigation;