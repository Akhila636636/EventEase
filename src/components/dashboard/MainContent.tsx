import React, { useState } from 'react';
import EventCard from '../events/EventCard';
import { Event } from '../../App';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface MainContentProps {
  events: Event[];
  onEventClick: (event: Event) => void;
}

const MainContent: React.FC<MainContentProps> = ({ events, onEventClick }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const featuredEvents = events.slice(0, 3);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredEvents.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredEvents.length) % featuredEvents.length);
  };

  return (
    <div className="p-8">
      {/* Slideshow */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6" style={{ color: '#2A2E35' }}>
          Featured Events
        </h2>
        
        <div className="relative">
          <div className="overflow-hidden rounded-lg shadow-lg">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {featuredEvents.map((event) => (
                <div key={event.id} className="w-full flex-shrink-0 relative">
                  <img
                    src={event.poster}
                    alt={event.name}
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">{event.name}</h3>
                    <p className="text-lg mb-1">{event.club}</p>
                    <p className="text-sm opacity-90">
                      {new Date(event.date).toLocaleDateString()} • {event.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {featuredEvents.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
              >
                <ChevronRight size={20} />
              </button>
              
              <div className="absolute bottom-4 right-4 flex space-x-2">
                {featuredEvents.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      currentSlide === index ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Event Cards */}
      <div>
        <h2 className="text-2xl font-bold mb-6" style={{ color: '#2A2E35' }}>
          Upcoming Events
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onClick={() => onEventClick(event)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainContent;