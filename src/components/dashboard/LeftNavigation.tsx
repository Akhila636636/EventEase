import React, { useState } from 'react';
import { Calendar, Clock, Upload, Image, Award } from 'lucide-react';
import { User, Event } from '../../App';

interface LeftNavigationProps {
  user: User;
  events: Event[];
}

const LeftNavigation: React.FC<LeftNavigationProps> = ({ user, events }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [memories, setMemories] = useState<string[]>([]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setMemories([...memories, result]);
      };
      reader.readAsDataURL(file);
    }
  };

  const upcomingEvents = events.slice(0, 3);

  return (
    <div className="fixed left-0 top-16 h-screen w-80 p-6 overflow-y-auto bg-white shadow-lg">
      {/* Calendar Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 flex items-center" style={{ color: '#2A2E35' }}>
          <Calendar size={20} className="mr-2" />
          Event Schedule
        </h3>
        
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="font-medium text-gray-500">{day}</div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: 35 }, (_, i) => {
              const date = new Date(2024, 11, i - 8);
              const hasEvent = events.some(event => 
                new Date(event.date).toDateString() === date.toDateString()
              );
              
              return (
                <div
                  key={i}
                  className={`h-8 flex items-center justify-center text-xs rounded cursor-pointer transition-colors ${
                    hasEvent 
                      ? 'bg-blue-500 text-white' 
                      : 'hover:bg-gray-200'
                  }`}
                >
                  {date.getDate()}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 flex items-center" style={{ color: '#2A2E35' }}>
          <Clock size={20} className="mr-2" />
          Upcoming Events
        </h3>
        
        <div className="space-y-3">
          {upcomingEvents.map(event => (
            <div key={event.id} className="bg-gray-50 rounded-lg p-3">
              <h4 className="font-medium text-sm" style={{ color: '#2A2E35' }}>
                {event.name}
              </h4>
              <p className="text-xs text-gray-600 mt-1">
                {new Date(event.date).toLocaleDateString()} at {event.time}
              </p>
              <p className="text-xs mt-1" style={{ color: '#7B8FA1' }}>
                {event.venue}
                {event.laptopRequired && (
                  <span className="ml-2 text-orange-600">💻 Laptop Required</span>
                )}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Memories Section */}
      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center" style={{ color: '#2A2E35' }}>
          <Image size={20} className="mr-2" />
          Memories
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Pictures/Certificates
            </label>
            <label className="flex items-center justify-center w-full h-24 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors">
              <div className="text-center">
                <Upload size={20} className="mx-auto mb-1 text-gray-400" />
                <span className="text-xs text-gray-500">Click to upload</span>
              </div>
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>
          
          {memories.length > 0 && (
            <div className="grid grid-cols-2 gap-2">
              {memories.map((memory, index) => (
                <div key={index} className="relative">
                  <img
                    src={memory}
                    alt="Memory"
                    className="w-full h-20 object-cover rounded-lg"
                  />
                  <div className="absolute top-1 right-1">
                    <Award size={12} className="text-yellow-500" />
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

export default LeftNavigation;