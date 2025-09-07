import React from 'react';
import TopNavigation from './TopNavigation';
import LeftNavigation from './LeftNavigation';
import MainContent from './MainContent';
import { User, Event } from '../../App';

interface DashboardProps {
  user: User;
  events: Event[];
  onEventClick: (event: Event) => void;
  onNavigate: (page: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, events, onEventClick, onNavigate }) => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#E4E9EC' }}>
      <TopNavigation user={user} onNavigate={onNavigate} />
      
      <div className="flex pt-16">
        <LeftNavigation user={user} events={events} />
        
        <div className="flex-1 ml-80">
          <MainContent events={events} onEventClick={onEventClick} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;