import React, { useState } from 'react';
import { ArrowLeft, Upload, Calendar, MapPin, Users, Download } from 'lucide-react';
import { User, Event, Venue } from '../../App';

interface CreateEventProps {
  user: User;
  venues: Venue[];
  onCreateEvent: (event: Omit<Event, 'id' | 'registrations'>) => void;
  onNavigate: (page: string) => void;
}

const CreateEvent: React.FC<CreateEventProps> = ({ 
  user, 
  venues, 
  onCreateEvent, 
  onNavigate 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    club: user.clubId || '',
    domain: '',
    date: '',
    time: '',
    venue: '',
    poster: '',
    description: '',
    isPaid: false,
    fee: '',
    laptopRequired: false
  });

  const [selectedVenue, setSelectedVenue] = useState<string>('');
  const [posterPreview, setPosterPreview] = useState<string>('');

  const handlePosterUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPosterPreview(result);
        setFormData({ ...formData, poster: result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const eventData: Omit<Event, 'id' | 'registrations'> = {
      ...formData,
      venue: selectedVenue || formData.venue,
      fee: formData.isPaid ? parseInt(formData.fee) : undefined,
      organizerId: user.id
    };

    onCreateEvent(eventData);
  };

  const generatePermissionLetter = () => {
    const letterContent = `
PERMISSION LETTER FOR EVENT ORGANIZATION

Date: ${new Date().toLocaleDateString()}

To,
The Dean/Director,
Academic Affairs,
[College Name]

Subject: Permission to Organize "${formData.name}"

Respected Sir/Madam,

We, the members of ${formData.club}, would like to seek permission to organize "${formData.name}" on the college premises.

Event Details:
- Event Name: ${formData.name}
- Organizing Club: ${formData.club}
- Domain/Category: ${formData.domain}
- Proposed Date: ${new Date(formData.date).toLocaleDateString()}
- Proposed Time: ${formData.time}
- Proposed Venue: ${selectedVenue || formData.venue}
- Expected Participants: [To be filled]
- Registration Fee: ${formData.isPaid ? `₹${formData.fee}` : 'Free'}

Event Description:
${formData.description}

We assure you that:
1. All college rules and regulations will be strictly followed
2. Proper arrangements will be made for venue management
3. Safety protocols will be maintained throughout the event
4. Clean-up will be done after the event

We request your kind approval for the same.

Thank you for your consideration.

Yours sincerely,
Event Organizing Committee
${formData.club}

Contact: ${user.name}
Roll No: ${user.rollNumber}
    `;

    const element = document.createElement('a');
    const file = new Blob([letterContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `permission-letter-${formData.name.replace(/\s+/g, '-')}-organization.txt`;
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

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-2xl font-bold mb-6" style={{ color: '#2A2E35' }}>
              Create New Event
            </h1>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Details */}
              <div>
                <h3 className="text-lg font-semibold mb-4" style={{ color: '#2A2E35' }}>
                  Basic Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Event Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Organizing Club <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.club}
                      onChange={(e) => setFormData({ ...formData, club: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Domain/Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.domain}
                      onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                    >
                      <option value="">Select Domain</option>
                      <option value="Technology">Technology</option>
                      <option value="Arts & Culture">Arts & Culture</option>
                      <option value="Business">Business</option>
                      <option value="Sports">Sports</option>
                      <option value="Academic">Academic</option>
                      <option value="Social">Social</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Event Poster */}
              <div>
                <h3 className="text-lg font-semibold mb-4" style={{ color: '#2A2E35' }}>
                  Event Poster
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Upload Poster
                    </label>
                    <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors">
                      <div className="text-center">
                        <Upload size={32} className="mx-auto mb-2 text-gray-400" />
                        <span className="text-sm text-gray-500">Click to upload poster</span>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePosterUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                  
                  {posterPreview && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Poster Preview
                      </label>
                      <img
                        src={posterPreview}
                        alt="Poster preview"
                        className="w-full h-40 object-cover rounded-lg border"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Date, Time & Venue */}
              <div>
                <h3 className="text-lg font-semibold mb-4" style={{ color: '#2A2E35' }}>
                  Scheduling & Venue
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Event Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Event Time <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="time"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    />
                  </div>
                </div>

                {/* Venue Selection (BookMyShow style) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Select Venue <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {venues.map((venue) => (
                      <button
                        key={venue.id}
                        type="button"
                        onClick={() => setSelectedVenue(venue.name)}
                        className={`p-4 rounded-lg border-2 text-center transition-all ${
                          selectedVenue === venue.name
                            ? 'border-green-500 bg-green-50'
                            : venue.available
                            ? 'border-green-300 hover:border-green-400 bg-green-50'
                            : 'border-red-300 bg-red-50 cursor-not-allowed'
                        }`}
                        disabled={!venue.available}
                      >
                        <MapPin size={20} className={`mx-auto mb-2 ${
                          venue.available ? 'text-green-600' : 'text-red-600'
                        }`} />
                        <div className="text-sm font-medium">{venue.name}</div>
                        <div className="text-xs text-gray-600">
                          Capacity: {venue.capacity}
                        </div>
                        <div className={`text-xs mt-1 ${
                          venue.available ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {venue.available ? 'Available' : 'Booked'}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Additional Details */}
              <div>
                <h3 className="text-lg font-semibold mb-4" style={{ color: '#2A2E35' }}>
                  Additional Details
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Event Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>

                  <div className="flex items-center space-x-6">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.isPaid}
                        onChange={(e) => setFormData({ ...formData, isPaid: e.target.checked })}
                        className="mr-2"
                      />
                      <span className="text-sm font-medium text-gray-700">Paid Event</span>
                    </label>
                    
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.laptopRequired}
                        onChange={(e) => setFormData({ ...formData, laptopRequired: e.target.checked })}
                        className="mr-2"
                      />
                      <span className="text-sm font-medium text-gray-700">Laptop Required</span>
                    </label>
                  </div>

                  {formData.isPaid && (
                    <div className="max-w-xs">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Registration Fee (₹) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        required={formData.isPaid}
                        min="0"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.fee}
                        onChange={(e) => setFormData({ ...formData, fee: e.target.value })}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex space-x-4">
                <button
                  type="submit"
                  disabled={!selectedVenue}
                  className="flex-1 py-3 text-white font-medium rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  style={{ backgroundColor: '#2A2E35' }}
                >
                  <Calendar size={20} className="mr-2" />
                  Create Event
                </button>
                
                <button
                  type="button"
                  onClick={generatePermissionLetter}
                  disabled={!formData.name || !formData.club}
                  className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  <Download size={20} className="mr-2" />
                  Permission Letter
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;