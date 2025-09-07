import React from 'react';
import { ArrowLeft, Download, Users, Calendar, MapPin } from 'lucide-react';
import { User, Event } from '../../App';

interface MonitorEventsProps {
  user: User;
  events: Event[];
  onNavigate: (page: string) => void;
}

const MonitorEvents: React.FC<MonitorEventsProps> = ({ user, events, onNavigate }) => {
  const upcomingEvents = events.filter(event => new Date(event.date) >= new Date());

  const downloadEventData = (event: Event) => {
    const csvContent = [
      ['Registration ID', 'User ID', 'Event Name', 'Registration Date', 'Transaction ID', 'Status'],
      ...event.registrations.map(reg => [
        reg.id,
        reg.userId,
        event.name,
        new Date(reg.timestamp).toLocaleDateString(),
        reg.transactionId || 'N/A',
        reg.attended ? 'Attended' : 'Registered'
      ])
    ].map(row => row.join(',')).join('\n');

    const element = document.createElement('a');
    const file = new Blob([csvContent], { type: 'text/csv' });
    element.href = URL.createObjectURL(file);
    element.download = `${event.name.replace(/\s+/g, '-')}-registrations.csv`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#E4E9EC' }}>
      <div className="p-8">
        <button
          onClick={() => onNavigate('organizer-dashboard')}
          className="flex items-center text-gray-600 hover:text-gray-800 mb-6"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Organizer Dashboard
        </button>

        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8" style={{ color: '#2A2E35' }}>
            Monitor Upcoming Events
          </h1>

          {upcomingEvents.length === 0 ? (
            <div className="bg-white rounded-lg shadow-lg p-12 text-center">
              <Calendar size={64} className="mx-auto mb-4 text-gray-400" />
              <h3 className="text-xl font-semibold mb-2 text-gray-600">
                No Upcoming Events
              </h3>
              <p className="text-gray-500 mb-6">
                You haven't created any upcoming events yet.
              </p>
              <button
                onClick={() => onNavigate('create-event')}
                className="px-6 py-3 text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
                style={{ backgroundColor: '#2A2E35' }}
              >
                Create Your First Event
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2" style={{ color: '#2A2E35' }}>
                          {event.name}
                        </h3>
                        <p className="text-gray-600 mb-2">{event.club}</p>
                        
                        <div className="flex items-center space-x-6 text-sm text-gray-600 mb-4">
                          <div className="flex items-center">
                            <Calendar size={16} className="mr-1" />
                            {new Date(event.date).toLocaleDateString()} at {event.time}
                          </div>
                          <div className="flex items-center">
                            <MapPin size={16} className="mr-1" />
                            {event.venue}
                          </div>
                          <div className="flex items-center">
                            <Users size={16} className="mr-1" />
                            {event.registrations.length} registrations
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <div className="text-right">
                          <div className="text-2xl font-bold" style={{ color: '#2A2E35' }}>
                            {event.registrations.length}
                          </div>
                          <div className="text-sm text-gray-600">Registrations</div>
                        </div>
                        
                        <button
                          onClick={() => downloadEventData(event)}
                          className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                          title="Download Registration Data"
                        >
                          <Download size={20} className="text-gray-600" />
                        </button>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="bg-gray-50 rounded-lg p-4 text-center">
                          <div className="text-lg font-semibold" style={{ color: '#2A2E35' }}>
                            {event.registrations.length}
                          </div>
                          <div className="text-sm text-gray-600">Total Registered</div>
                        </div>
                        
                        <div className="bg-blue-50 rounded-lg p-4 text-center">
                          <div className="text-lg font-semibold text-blue-600">
                            {event.registrations.filter(r => r.attended).length}
                          </div>
                          <div className="text-sm text-blue-600">Attended</div>
                        </div>
                        
                        <div className="bg-green-50 rounded-lg p-4 text-center">
                          <div className="text-lg font-semibold text-green-600">
                            {event.isPaid ? `₹${(event.fee || 0) * event.registrations.length}` : 'Free'}
                          </div>
                          <div className="text-sm text-green-600">Total Revenue</div>
                        </div>
                        
                        <div className="bg-purple-50 rounded-lg p-4 text-center">
                          <div className="text-lg font-semibold text-purple-600">
                            {Math.ceil((new Date(event.date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))}
                          </div>
                          <div className="text-sm text-purple-600">Days Remaining</div>
                        </div>
                      </div>
                    </div>

                    {event.registrations.length > 0 && (
                      <div className="mt-4">
                        <h4 className="font-medium mb-2" style={{ color: '#2A2E35' }}>
                          Recent Registrations
                        </h4>
                        <div className="space-y-2 max-h-40 overflow-y-auto">
                          {event.registrations.slice(0, 5).map((registration) => (
                            <div key={registration.id} className="flex justify-between items-center text-sm bg-gray-50 rounded p-2">
                              <div>
                                <span className="font-medium">User #{registration.userId}</span>
                                <span className="text-gray-600 ml-2">
                                  {new Date(registration.timestamp).toLocaleDateString()}
                                </span>
                              </div>
                              {registration.transactionId && (
                                <div className="text-xs text-gray-500">
                                  ID: {registration.transactionId}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MonitorEvents;