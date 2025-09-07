import React, { useState } from 'react';
import { Calendar, MapPin, Users, Laptop } from 'lucide-react';
import { Event } from '../../App';

interface EventCardProps {
  event: Event;
  onClick: () => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onClick }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="relative h-80 cursor-pointer group perspective-1000"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={onClick}
    >
      <div className={`relative w-full h-full transform-gpu transition-transform duration-700 transform-style-preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
        {/* Front Side */}
        <div className="absolute inset-0 w-full h-full backface-hidden rounded-lg shadow-lg overflow-hidden">
          <img
            src={event.poster}
            alt={event.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-4 left-4 text-white">
            <h3 className="text-xl font-bold mb-1">{event.name}</h3>
            <p className="text-sm opacity-90">{event.club}</p>
          </div>
          {event.isPaid && (
            <div className="absolute top-4 right-4 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              ₹{event.fee}
            </div>
          )}
        </div>

        {/* Back Side */}
        <div 
          className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-lg shadow-lg p-6 flex flex-col justify-between"
          style={{ backgroundColor: '#2A2E35' }}
        >
          <div>
            <h3 className="text-xl font-bold text-white mb-2">{event.name}</h3>
            <p className="text-gray-300 text-sm mb-4">{event.club}</p>
            
            <div className="space-y-2 text-sm text-gray-300">
              <div className="flex items-center">
                <Calendar size={16} className="mr-2" />
                {new Date(event.date).toLocaleDateString()} at {event.time}
              </div>
              <div className="flex items-center">
                <MapPin size={16} className="mr-2" />
                {event.venue}
              </div>
              <div className="flex items-center">
                <Users size={16} className="mr-2" />
                {event.domain}
              </div>
              {event.laptopRequired && (
                <div className="flex items-center text-orange-400">
                  <Laptop size={16} className="mr-2" />
                  Laptop Required
                </div>
              )}
            </div>
            
            <p className="text-gray-300 text-xs mt-4 line-clamp-3">
              {event.description}
            </p>
          </div>
          
          <button 
            className="w-full py-2 rounded-lg text-white font-medium hover:opacity-90 transition-opacity"
            style={{ backgroundColor: '#7B8FA1' }}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;