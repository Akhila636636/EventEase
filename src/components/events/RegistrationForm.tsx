import React, { useState } from 'react';
import { ArrowLeft, Download, CreditCard, CheckCircle } from 'lucide-react';
import { Event, User } from '../../App';

interface RegistrationFormProps {
  event: Event;
  user: User;
  onNavigate: (page: string) => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ 
  event, 
  user, 
  onNavigate 
}) => {
  const [formData, setFormData] = useState({
    transactionId: '',
    paymentMethod: 'upi',
    confirmed: false
  });
  
  const [isRegistered, setIsRegistered] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsRegistered(true);
  };

  const generatePermissionLetter = () => {
    const letterContent = `
PERMISSION LETTER

Date: ${new Date().toLocaleDateString()}

To,
The Head of Department,
${user.branch} Engineering,
[College Name]

Subject: Permission to Attend ${event.name}

Respected Sir/Madam,

I, ${user.name} (Roll No: ${user.rollNumber}), am a ${user.year} student of ${user.branch} Engineering. I would like to seek your permission to attend "${event.name}" organized by ${event.club}.

Event Details:
- Event Name: ${event.name}
- Date: ${new Date(event.date).toLocaleDateString()}
- Time: ${event.time}
- Venue: ${event.venue}
- Domain: ${event.domain}

I believe this event will be beneficial for my academic and professional growth. I assure you that I will not miss any important classes and will complete any pending assignments.

Thank you for your consideration.

Yours sincerely,
${user.name}
Roll No: ${user.rollNumber}
${user.year}, ${user.branch} Engineering
    `;

    const element = document.createElement('a');
    const file = new Blob([letterContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `permission-letter-${event.name.replace(/\s+/g, '-')}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  if (isRegistered) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#E4E9EC' }}>
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <CheckCircle size={64} className="mx-auto mb-4 text-green-500" />
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#2A2E35' }}>
            Registration Successful!
          </h2>
          <p className="text-gray-600 mb-6">
            You have successfully registered for {event.name}. 
            A confirmation email has been sent to your registered email address.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => onNavigate('dashboard')}
              className="w-full py-3 text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
              style={{ backgroundColor: '#2A2E35' }}
            >
              Back to Dashboard
            </button>
            <button
              onClick={generatePermissionLetter}
              className="w-full py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center"
            >
              <Download size={20} className="mr-2" />
              Download Permission Letter
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#E4E9EC' }}>
      <div className="p-8">
        <button
          onClick={() => onNavigate('event-details')}
          className="flex items-center text-gray-600 hover:text-gray-800 mb-6"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Event Details
        </button>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-8">
              <h1 className="text-2xl font-bold mb-6" style={{ color: '#2A2E35' }}>
                Register for {event.name}
              </h1>

              {/* Event Summary */}
              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <h3 className="font-semibold mb-4">Event Summary</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Event:</span>
                    <div className="font-medium">{event.name}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Organizer:</span>
                    <div className="font-medium">{event.club}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Date & Time:</span>
                    <div className="font-medium">
                      {new Date(event.date).toLocaleDateString()} at {event.time}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600">Venue:</span>
                    <div className="font-medium">{event.venue}</div>
                  </div>
                  {event.isPaid && (
                    <div>
                      <span className="text-gray-600">Registration Fee:</span>
                      <div className="font-medium text-green-600">₹{event.fee}</div>
                    </div>
                  )}
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Student Details (Pre-filled) */}
                <div>
                  <h3 className="font-semibold mb-4">Student Details</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={user.name}
                        readOnly
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Roll Number
                      </label>
                      <input
                        type="text"
                        value={user.rollNumber}
                        readOnly
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Year of Study
                      </label>
                      <input
                        type="text"
                        value={user.year}
                        readOnly
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Branch
                      </label>
                      <input
                        type="text"
                        value={user.branch}
                        readOnly
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Section (if paid event) */}
                {event.isPaid && (
                  <div>
                    <h3 className="font-semibold mb-4 flex items-center">
                      <CreditCard size={20} className="mr-2" />
                      Payment Details
                    </h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Payment Method
                        </label>
                        <select
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={formData.paymentMethod}
                          onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                        >
                          <option value="upi">UPI</option>
                          <option value="card">Credit/Debit Card</option>
                          <option value="netbanking">Net Banking</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Transaction ID <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Enter transaction ID after payment"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={formData.transactionId}
                          onChange={(e) => setFormData({ ...formData, transactionId: e.target.value })}
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Complete the payment of ₹{event.fee} and enter the transaction ID above
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Confirmation */}
                <div>
                  <label className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      required
                      checked={formData.confirmed}
                      onChange={(e) => setFormData({ ...formData, confirmed: e.target.checked })}
                      className="mt-1"
                    />
                    <span className="text-sm text-gray-700">
                      I confirm that the above details are correct and I agree to the terms and conditions. 
                      I understand that this registration is subject to approval and the event guidelines.
                    </span>
                  </label>
                </div>

                <div className="flex space-x-4">
                  <button
                    type="submit"
                    disabled={!formData.confirmed || (event.isPaid && !formData.transactionId)}
                    className="flex-1 py-3 text-white font-medium rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ backgroundColor: '#2A2E35' }}
                  >
                    Complete Registration
                  </button>
                  
                  <button
                    type="button"
                    onClick={generatePermissionLetter}
                    className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center"
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
    </div>
  );
};

export default RegistrationForm;