import React, { useState } from 'react';
import { Plus, Monitor, BarChart, Calendar, ArrowLeft } from 'lucide-react';
import { User } from '../../App';

interface OrganizerDashboardProps {
  user: User;
  onNavigate: (page: string) => void;
}

const OrganizerDashboard: React.FC<OrganizerDashboardProps> = ({ user, onNavigate }) => {
  const [clubCredentials, setClubCredentials] = useState({
    clubId: '',
    password: ''
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleClubLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple validation - in real app, this would be proper authentication
    if (clubCredentials.clubId && clubCredentials.password) {
      setIsAuthenticated(true);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#E4E9EC' }}>
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
          <div className="text-center mb-6">
            <Calendar size={48} className="mx-auto mb-4" style={{ color: '#2A2E35' }} />
            <h2 className="text-2xl font-bold" style={{ color: '#2A2E35' }}>
              Organizer Access
            </h2>
            <p className="text-gray-600 mt-2">
              Please verify your club credentials to continue
            </p>
          </div>

          <form onSubmit={handleClubLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Club ID
              </label>
              <input
                type="text"
                required
                placeholder="Enter your club ID"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={clubCredentials.clubId}
                onChange={(e) => setClubCredentials({ ...clubCredentials, clubId: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Club Password
              </label>
              <input
                type="password"
                required
                placeholder="Enter your club password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={clubCredentials.password}
                onChange={(e) => setClubCredentials({ ...clubCredentials, password: e.target.value })}
              />
            </div>

            <div className="flex space-x-3">
              <button
                type="button"
                onClick={() => onNavigate('dashboard')}
                className="flex-1 py-2 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition-colors flex items-center justify-center"
              >
                <ArrowLeft size={20} className="mr-2" />
                Back
              </button>
              <button
                type="submit"
                className="flex-1 py-2 text-white font-medium rounded-md hover:opacity-90 transition-opacity"
                style={{ backgroundColor: '#2A2E35' }}
              >
                Access Organizer Portal
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#E4E9EC' }}>
      <div className="p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold" style={{ color: '#2A2E35' }}>
              Organizer Dashboard
            </h1>
            <p className="text-gray-600 mt-2">
              Welcome back, {user.name} | Club: {clubCredentials.clubId}
            </p>
          </div>
          <button
            onClick={() => onNavigate('dashboard')}
            className="flex items-center text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Main Dashboard
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
          {/* Create New Event */}
          <div 
            className="bg-white rounded-lg shadow-lg p-8 text-center cursor-pointer hover:shadow-xl transition-shadow group"
            onClick={() => onNavigate('create-event')}
          >
            <div className="mb-6">
              <div 
                className="w-20 h-20 rounded-full mx-auto flex items-center justify-center group-hover:scale-110 transition-transform"
                style={{ backgroundColor: '#2A2E35' }}
              >
                <Plus size={32} className="text-white" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-3" style={{ color: '#2A2E35' }}>
              Create New Event
            </h3>
            <p className="text-gray-600">
              Set up a new event with venue booking, scheduling, and all necessary details
            </p>
          </div>

          {/* Monitor Upcoming Events */}
          <div 
            className="bg-white rounded-lg shadow-lg p-8 text-center cursor-pointer hover:shadow-xl transition-shadow group"
            onClick={() => onNavigate('monitor-events')}
          >
            <div className="mb-6">
              <div 
                className="w-20 h-20 rounded-full mx-auto flex items-center justify-center group-hover:scale-110 transition-transform"
                style={{ backgroundColor: '#7B8FA1' }}
              >
                <Monitor size={32} className="text-white" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-3" style={{ color: '#2A2E35' }}>
              Monitor Upcoming Events
            </h3>
            <p className="text-gray-600">
              Track registrations, manage attendees, and download event data
            </p>
          </div>

          {/* Review Past Events */}
          <div 
            className="bg-white rounded-lg shadow-lg p-8 text-center cursor-pointer hover:shadow-xl transition-shadow group"
            onClick={() => onNavigate('review-events')}
          >
            <div className="mb-6">
              <div 
                className="w-20 h-20 rounded-full mx-auto flex items-center justify-center group-hover:scale-110 transition-transform"
                style={{ backgroundColor: '#7B8FA1' }}
              >
                <BarChart size={32} className="text-white" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-3" style={{ color: '#2A2E35' }}>
              Review Past Events
            </h3>
            <p className="text-gray-600">
              Analyze event performance, attendance statistics, and feedback
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizerDashboard;