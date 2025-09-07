import React from 'react';
import { Calendar, MapPin, Users, Laptop, ArrowLeft, Clock, IndianRupee } from 'lucide-react';
import { Event } from '../../App';

interface EventDetailsProps {
  event: Event;
  events: Event[];
  onRegisterClick: () => void;
  onNavigate: (page: string) => void;
}

const EventDetails: React.FC<EventDetailsProps> = ({ 
  event, 
  events, 
  onRegisterClick, 
  onNavigate 
}) => {
  const similarEvents = events
    .filter(e => e.id !== event.id && e.domain === event.domain)
    .slice(0, 3);

  const pastEventsByClub = events
    .filter(e => e.club === event.club && new Date(e.date) < new Date())
    .slice(0, 3);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#E4E9EC' }}>
      <div className="p-8">
        <button
          onClick={() => onNavigate('dashboard')}
          className="flex items-center text-gray-600 hover:text-gray-800 mb-6"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Dashboard
        </button>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
                <img
                  src={event.poster}
                  alt={event.name}
                  className="w-full h-80 object-cover"
                />
                
                <div className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h1 className="text-3xl font-bold mb-2" style={{ color: '#2A2E35' }}>
                        {event.name}
                      </h1>
                      <p className="text-lg" style={{ color: '#7B8FA1' }}>
                        Organized by {event.club}
                      </p>
                    </div>
                    
                    {event.isPaid && (
                      <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full font-medium">
                        <IndianRupee size={16} className="inline mr-1" />
                        {event.fee}
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-6 mb-8">
                    <div className="flex items-center text-gray-600">
                      <Calendar size={20} className="mr-3" />
                      <div>
                        <div className="font-medium">
                          {new Date(event.date).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </div>
                        <div className="text-sm text-gray-500">{event.time}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-gray-600">
                      <MapPin size={20} className="mr-3" />
                      <div>
                        <div className="font-medium">{event.venue}</div>
                        <div className="text-sm text-gray-500">College Campus</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-gray-600">
                      <Users size={20} className="mr-3" />
                      <div>
                        <div className="font-medium">{event.domain}</div>
                        <div className="text-sm text-gray-500">Category</div>
                      </div>
                    </div>
                    
                    {event.laptopRequired && (
                      <div className="flex items-center text-orange-600">
                        <Laptop size={20} className="mr-3" />
                        <div>
                          <div className="font-medium">Laptop Required</div>
                          <div className="text-sm text-orange-500">Please bring your device</div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4" style={{ color: '#2A2E35' }}>
                      About This Event
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                      {event.description}
                    </p>
                  </div>

                  <button
                    onClick={onRegisterClick}
                    className="w-full lg:w-auto px-8 py-3 text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: '#2A2E35' }}
                  >
                    Register Now
                  </button>
                </div>
              </div>

              {/* Past Events by Club */}
              {pastEventsByClub.length > 0 && (
                <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                  <h2 className="text-xl font-semibold mb-6" style={{ color: '#2A2E35' }}>
                    Past Events by {event.club}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {pastEventsByClub.map(pastEvent => (
                      <div key={pastEvent.id} className="border rounded-lg overflow-hidden">
                        <img
                          src={pastEvent.poster}
                          alt={pastEvent.name}
                          className="w-full h-32 object-cover"
                        />
                        <div className="p-4">
                          <h3 className="font-medium text-sm mb-2">{pastEvent.name}</h3>
                          <p className="text-xs text-gray-600">
                            {new Date(pastEvent.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div>
              {/* Similar Events */}
              {similarEvents.length > 0 && (
                <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                  <h3 className="text-lg font-semibold mb-4" style={{ color: '#2A2E35' }}>
                    Similar Events
                  </h3>
                  <div className="space-y-4">
                    {similarEvents.map(similarEvent => (
                      <div 
                        key={similarEvent.id} 
                        className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => onNavigate('event-details')}
                      >
                        <h4 className="font-medium text-sm mb-2">{similarEvent.name}</h4>
                        <p className="text-xs text-gray-600 mb-2">{similarEvent.club}</p>
                        <div className="flex items-center text-xs text-gray-500">
                          <Clock size={12} className="mr-1" />
                          {new Date(similarEvent.date).toLocaleDateString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Event Stats */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-4" style={{ color: '#2A2E35' }}>
                  Event Information
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Registrations</span>
                    <span className="font-medium">{event.registrations.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Category</span>
                    <span className="font-medium">{event.domain}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Venue</span>
                    <span className="font-medium">{event.venue}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Entry Fee</span>
                    <span className="font-medium">
                      {event.isPaid ? `₹${event.fee}` : 'Free'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;