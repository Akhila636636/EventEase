import React, { useState } from 'react';
import { User, Calendar, BookOpen } from 'lucide-react';
import { User as UserType } from '../../App';

interface LoginPageProps {
  onLogin: (user: UserType) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    rollNumber: '',
    year: '',
    branch: '',
    email: '',
    password: '',
    userType: 'student' as 'student' | 'organizer',
    clubId: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const user: UserType = {
      id: Date.now().toString(),
      name: formData.name,
      rollNumber: formData.rollNumber,
      year: formData.year,
      branch: formData.branch,
      type: formData.userType,
      clubId: formData.userType === 'organizer' ? formData.clubId : undefined
    };

    onLogin(user);
  };

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#E4E9EC' }}>
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center" style={{ backgroundColor: '#2A2E35' }}>
        <div className="text-center text-white p-8">
          <div className="flex justify-center mb-6">
            <Calendar size={64} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-4">EventEase</h1>
          <p className="text-xl mb-8" style={{ color: '#7B8FA1' }}>
            Your gateway to seamless event management
          </p>
          <div className="flex justify-center space-x-8">
            <div className="text-center">
              <BookOpen size={32} className="mx-auto mb-2" />
              <p className="text-sm">Discover Events</p>
            </div>
            <div className="text-center">
              <User size={32} className="mx-auto mb-2" />
              <p className="text-sm">Easy Registration</p>
            </div>
            <div className="text-center">
              <Calendar size={32} className="mx-auto mb-2" />
              <p className="text-sm">Smart Scheduling</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold" style={{ color: '#2A2E35' }}>
                {isSignUp ? 'Sign Up' : 'Sign In'}
              </h2>
              <p className="text-gray-600 mt-2">
                {isSignUp ? 'Create your EventEase account' : 'Welcome back to EventEase'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {isSignUp && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
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
                      Roll Number
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.rollNumber}
                      onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Year of Study
                      </label>
                      <select
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.year}
                        onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                      >
                        <option value="">Select Year</option>
                        <option value="1st Year">1st Year</option>
                        <option value="2nd Year">2nd Year</option>
                        <option value="3rd Year">3rd Year</option>
                        <option value="4th Year">4th Year</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Branch
                      </label>
                      <select
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.branch}
                        onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                      >
                        <option value="">Select Branch</option>
                        <option value="Computer Science">Computer Science</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Mechanical">Mechanical</option>
                        <option value="Civil">Civil</option>
                        <option value="Chemical">Chemical</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Account Type
                    </label>
                    <div className="flex space-x-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="userType"
                          value="student"
                          checked={formData.userType === 'student'}
                          onChange={(e) => setFormData({ ...formData, userType: e.target.value as 'student' | 'organizer' })}
                          className="mr-2"
                        />
                        Student
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="userType"
                          value="organizer"
                          checked={formData.userType === 'organizer'}
                          onChange={(e) => setFormData({ ...formData, userType: e.target.value as 'student' | 'organizer' })}
                          className="mr-2"
                        />
                        Organizer
                      </label>
                    </div>
                  </div>

                  {formData.userType === 'organizer' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Club ID
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.clubId}
                        onChange={(e) => setFormData({ ...formData, clubId: e.target.value })}
                      />
                    </div>
                  )}
                </>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-md text-white font-medium hover:opacity-90 transition-opacity"
                style={{ backgroundColor: '#2A2E35' }}
              >
                {isSignUp ? 'Create Account' : 'Sign In'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                <button
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="font-medium hover:underline"
                  style={{ color: '#2A2E35' }}
                >
                  {isSignUp ? 'Sign In' : 'Sign Up'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;