
'use client';

import { useState } from 'react';
import { Database, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/entries`, formData);
      
      toast.success('Entry successfully created!');
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      
      // Reset submitted state after 3 seconds
      setTimeout(() => {
        setSubmitted(false);
      }, 3000);
      
    } catch (error) {
      console.error('Error creating entry:', error);
      toast.error('Failed to create entry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 md:p-24">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 md:p-8 space-y-6">
        <div className="flex items-center justify-center space-x-2">
          <Database className="w-8 h-8 text-primary-600" />
          <h1 className="text-2xl font-bold text-gray-800">Simple Data Entry</h1>
        </div>
        
        <p className="text-gray-600 text-center">
          Fill out the form below to create a new entry in the database.
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter your name"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter your email"
            />
          </div>
          
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="3"
              required
              value={formData.message}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter your message"
            />
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary w-full flex items-center justify-center"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin mr-2 h-5 w-5" />
                Submitting...
              </>
            ) : submitted ? (
              <>
                <CheckCircle className="mr-2 h-5 w-5" />
                Submitted!
              </>
            ) : (
              'Submit Entry'
            )}
          </button>
        </form>
        
        <div className="text-center text-sm text-gray-500">
          {submitted ? (
            <div className="flex items-center justify-center text-green-600">
              <CheckCircle className="mr-1 h-4 w-4" />
              Entry successfully added to database!
            </div>
          ) : (
            <p>All fields are required to create an entry.</p>
          )}
        </div>
      </div>
    </main>
  );
}
