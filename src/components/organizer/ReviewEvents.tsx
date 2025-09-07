import React from 'react';
import { ArrowLeft, Calendar, MapPin, Users, TrendingUp, Download } from 'lucide-react';
import { User, Event } from '../../App';

interface ReviewEventsProps {
  user: User;
  events: Event[];
  onNavigate: (page: string) => void;
}

const ReviewEvents: React.FC<ReviewEventsProps> = ({ user, events, onNavigate }) => {
  const pastEvents = events.filter(event => new Date(event.date) < new Date());

  const downloadEventAnalytics = (event: Event) => {
    const analyticsData = {
      eventName: event.name,
      club: event.club,
      date: event.date,
      venue: event.venue,
      totalRegistrations: event.registrations.length,
      actualAttendance: event.registrations.filter(r => r.attended).length,
      attendanceRate: event.registrations.length > 0 
        ? ((event.registrations.filter(r => r.attended).length / event.registrations.length) * 100).toFixed(2)
        : '0',
      totalRevenue: event.isPaid ? (event.fee || 0) * event.registrations.length : 0,
      registrationsByDay: {
        // This would be calculated from actual registration timestamps
        total: event.registrations.length
      }
    };

    const jsonContent = JSON.stringify(analyticsData, null, 2);
    const element = document.createElement('a');
    const file = new Blob([jsonContent], { type: 'application/json' });
    element.href = URL.createObjectURL(file);
    element.download = `${event.name.replace(/\s+/g, '-')}-analytics.json`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const getAttendanceRate = (event: Event) => {
    if (event.registrations.length === 0) return 0;
    return ((event.registrations.filter(r => r.attended).length / event.registrations.length) * 100);
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
            Review Past Events
          </h1>

          {pastEvents.length === 0 ? (
            <div className="bg-white rounded-lg shadow-lg p-12 text-center">
              <Calendar size={64} className="mx-auto mb-4 text-gray-400" />
              <h3 className="text-xl font-semibold mb-2 text-gray-600">
                No Past Events
              </h3>
              <p className="text-gray-500">
                You haven't organized any events yet or no events have concluded.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {pastEvents.map((event) => {
                const attendanceRate = getAttendanceRate(event);
                const totalRevenue = event.isPaid ? (event.fee || 0) * event.registrations.length : 0;
                
                return (
                  <div key={event.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                    <div className="relative">
                      <img
                        src={event.poster}
                        alt={event.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4 text-white">
                        <h3 className="text-xl font-bold mb-1">{event.name}</h3>
                        <p className="text-sm opacity-90">{event.club}</p>
                      </div>
                      
                      <button
                        onClick={() => downloadEventAnalytics(event)}
                        className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
                        title="Download Analytics"
                      >
                        <Download size={20} className="text-white" />
                      </button>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center text-sm text-gray-600 space-x-4">
                          <div className="flex items-center">
                            <Calendar size={16} className="mr-1" />
                            {new Date(event.date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center">
                            <MapPin size={16} className="mr-1" />
                            {event.venue}
                          </div>
                        </div>
                      </div>

                      {/* Key Metrics */}
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-blue-50 rounded-lg p-4 text-center">
                          <Users size={24} className="mx-auto mb-2 text-blue-600" />
                          <div className="text-2xl font-bold text-blue-600">
                            {event.registrations.length}
                          </div>
                          <div className="text-sm text-blue-600">Total Registrations</div>
                        </div>
                        
                        <div className="bg-green-50 rounded-lg p-4 text-center">
                          <TrendingUp size={24} className="mx-auto mb-2 text-green-600" />
                          <div className="text-2xl font-bold text-green-600">
                            {attendanceRate.toFixed(0)}%
                          </div>
                          <div className="text-sm text-green-600">Attendance Rate</div>
                        </div>
                      </div>

                      {/* Detailed Stats */}
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Registered Attendees:</span>
                          <span className="font-medium">{event.registrations.length}</span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Actual Attendance:</span>
                          <span className="font-medium">
                            {event.registrations.filter(r => r.attended).length}
                          </span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">No Shows:</span>
                          <span className="font-medium text-red-600">
                            {event.registrations.length - event.registrations.filter(r => r.attended).length}
                          </span>
                        </div>
                        
                        {event.isPaid && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Total Revenue:</span>
                            <span className="font-medium text-green-600">₹{totalRevenue}</span>
                          </div>
                        )}
                        
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Event Category:</span>
                          <span className="font-medium">{event.domain}</span>
                        </div>
                      </div>

                      {/* Attendance Rate Bar */}
                      <div className="mt-6">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-600">Attendance Rate</span>
                          <span className="text-sm font-medium">{attendanceRate.toFixed(1)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              attendanceRate >= 80 ? 'bg-green-500' :
                              attendanceRate >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${Math.min(attendanceRate, 100)}%` }}
                          />
                        </div>
                      </div>

                      {/* Performance Badge */}
                      <div className="mt-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          attendanceRate >= 80 
                            ? 'bg-green-100 text-green-800' 
                            : attendanceRate >= 60 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {attendanceRate >= 80 ? 'Excellent' : 
                           attendanceRate >= 60 ? 'Good' : 'Needs Improvement'}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewEvents;