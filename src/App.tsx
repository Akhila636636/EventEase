import React, { useState } from 'react';
import LoginPage from './components/auth/LoginPage';
import Dashboard from './components/dashboard/Dashboard';
import EventDetails from './components/events/EventDetails';
import RegistrationForm from './components/events/RegistrationForm';
import OrganizerDashboard from './components/organizer/OrganizerDashboard';
import CreateEvent from './components/organizer/CreateEvent';
import MonitorEvents from './components/organizer/MonitorEvents';
import ReviewEvents from './components/organizer/ReviewEvents';

export type User = {
  id: string;
  name: string;
  rollNumber: string;
  year: string;
  branch: string;
  type: 'student' | 'organizer';
  clubId?: string;
};

export type Event = {
  id: string;
  name: string;
  club: string;
  domain: string;
  date: string;
  time: string;
  venue: string;
  poster: string;
  description: string;
  isPaid: boolean;
  fee?: number;
  laptopRequired: boolean;
  registrations: Registration[];
  organizerId: string;
};

export type Registration = {
  id: string;
  userId: string;
  eventId: string;
  transactionId?: string;
  timestamp: string;
  attended?: boolean;
};

export type Venue = {
  id: string;
  name: string;
  capacity: number;
  available: boolean;
};

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState<string>('login');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  
  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      name: 'Tech Summit 2024',
      club: 'Computer Science Club',
      domain: 'Technology',
      date: '2024-12-20',
      time: '10:00 AM',
      venue: 'APJ Auditorium',
      poster: 'https://images.pexels.com/photos/1181676/pexels-photo-1181676.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Join us for the biggest tech event of the year featuring industry experts and innovative workshops.',
      isPaid: true,
      fee: 500,
      laptopRequired: true,
      registrations: [],
      organizerId: 'org1'
    },
    {
      id: '2',
      name: 'Cultural Fest',
      club: 'Cultural Committee',
      domain: 'Arts & Culture',
      date: '2024-12-25',
      time: '6:00 PM',
      venue: 'C Block Seminar Hall',
      poster: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Celebrate diversity and creativity in our annual cultural festival with performances and competitions.',
      isPaid: false,
      laptopRequired: false,
      registrations: [],
      organizerId: 'org2'
    },
    {
      id: '3',
      name: 'Innovation Workshop',
      club: 'Entrepreneurship Cell',
      domain: 'Business',
      date: '2024-12-18',
      time: '2:00 PM',
      venue: 'B Block Seminar Hall',
      poster: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Learn about startup ecosystems and innovation methodologies from successful entrepreneurs.',
      isPaid: true,
      fee: 300,
      laptopRequired: true,
      registrations: [],
      organizerId: 'org3'
    }
  ]);

  const venues: Venue[] = [
    { id: '1', name: 'APJ Auditorium', capacity: 500, available: true },
    { id: '2', name: 'C Block Seminar Hall', capacity: 150, available: true },
    { id: '3', name: 'B Block Seminar Hall', capacity: 200, available: true },
    { id: '4', name: 'E Block Classrooms', capacity: 50, available: true }
  ];

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setCurrentPage('dashboard');
  };

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setCurrentPage('event-details');
  };

  const handleRegisterClick = () => {
    setCurrentPage('registration');
  };

  const handleCreateEvent = (newEvent: Omit<Event, 'id' | 'registrations'>) => {
    const event: Event = {
      ...newEvent,
      id: Date.now().toString(),
      registrations: []
    };
    setEvents([...events, event]);
    setCurrentPage('organizer-dashboard');
  };

  const handleUpdateEvent = (updatedEvent: Event) => {
    setEvents(events.map(e => e.id === updatedEvent.id ? updatedEvent : e));
  };

  const handleDeleteEvent = (eventId: string) => {
    setEvents(events.filter(e => e.id !== eventId));
  };

  const navigate = (page: string, event?: Event) => {
    if (event) setSelectedEvent(event);
    setCurrentPage(page);
  };

  if (!currentUser) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return (
          <Dashboard
            user={currentUser}
            events={events}
            onEventClick={handleEventClick}
            onNavigate={navigate}
          />
        );
      case 'event-details':
        return (
          <EventDetails
            event={selectedEvent!}
            events={events}
            onRegisterClick={handleRegisterClick}
            onNavigate={navigate}
          />
        );
      case 'registration':
        return (
          <RegistrationForm
            event={selectedEvent!}
            user={currentUser}
            onNavigate={navigate}
          />
        );
      case 'organizer-dashboard':
        return (
          <OrganizerDashboard
            user={currentUser}
            onNavigate={navigate}
          />
        );
      case 'create-event':
        return (
          <CreateEvent
            user={currentUser}
            venues={venues}
            onCreateEvent={handleCreateEvent}
            onNavigate={navigate}
          />
        );
      case 'monitor-events':
        return (
          <MonitorEvents
            user={currentUser}
            events={events.filter(e => e.organizerId === currentUser.id)}
            onNavigate={navigate}
          />
        );
      case 'review-events':
        return (
          <ReviewEvents
            user={currentUser}
            events={events.filter(e => e.organizerId === currentUser.id)}
            onNavigate={navigate}
          />
        );
      default:
        return (
          <Dashboard
            user={currentUser}
            events={events}
            onEventClick={handleEventClick}
            onNavigate={navigate}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {renderCurrentPage()}
    </div>
  );
}

export default App;