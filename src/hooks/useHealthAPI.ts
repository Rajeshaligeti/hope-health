import { useState, useEffect } from 'react';

// API endpoint placeholders - ready for backend integration
const API_BASE_URL = '/api';

// Health Data API Hook
export const useHealthData = () => {
  const [healthData, setHealthData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchHealthData = async () => {
    setLoading(true);
    setError(null);
    try {
      // TODO: Replace with actual API call to /api/health-data
      // const response = await fetch(`${API_BASE_URL}/health-data`);
      // const data = await response.json();
      
      // Mock data for now
      const mockData = {
        heartRate: { current: 72, status: 'good' },
        steps: { current: 8543, goal: 10000, status: 'good' },
        sleep: { current: 7.2, status: 'excellent' },
        bmi: { value: 23.1, category: 'Normal', status: 'good' }
      };
      
      setTimeout(() => {
        setHealthData(mockData);
        setLoading(false);
      }, 1000);
    } catch (err) {
      setError('Failed to fetch health data');
      setLoading(false);
    }
  };

  const postHealthData = async (data: any) => {
    setLoading(true);
    setError(null);
    try {
      // TODO: Replace with actual API call to POST /api/health-data
      // const response = await fetch(`${API_BASE_URL}/health-data`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data)
      // });
      
      console.log('Would post health data:', data);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    } catch (err) {
      setError('Failed to save health data');
      setLoading(false);
    }
  };

  return { healthData, loading, error, fetchHealthData, postHealthData };
};

// Calendar API Hook
export const useCalendarAPI = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = async () => {
    setLoading(true);
    setError(null);
    try {
      // TODO: Replace with actual API call to /api/calendar
      // const response = await fetch(`${API_BASE_URL}/calendar`);
      // const data = await response.json();
      
      // Mock calendar events
      const mockEvents = [
        { id: 1, title: 'Doctor Appointment', type: 'appointment', date: '2024-01-15', time: '10:00' },
        { id: 2, title: 'Take Medication', type: 'medication', date: '2024-01-15', time: '08:00' },
        { id: 3, title: 'Exercise Session', type: 'exercise', date: '2024-01-15', time: '18:00' }
      ];
      
      setTimeout(() => {
        setEvents(mockEvents);
        setLoading(false);
      }, 800);
    } catch (err) {
      setError('Failed to fetch calendar events');
      setLoading(false);
    }
  };

  const addEvent = async (event: any) => {
    setLoading(true);
    setError(null);
    try {
      // TODO: Replace with actual API call to POST /api/calendar
      // const response = await fetch(`${API_BASE_URL}/calendar`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(event)
      // });
      
      console.log('Would add calendar event:', event);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    } catch (err) {
      setError('Failed to add calendar event');
      setLoading(false);
    }
  };

  return { events, loading, error, fetchEvents, addEvent };
};

// Health Videos API Hook
export const useHealthVideos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchVideos = async () => {
    setLoading(true);
    setError(null);
    try {
      // TODO: Replace with actual API call to /api/videos
      // const response = await fetch(`${API_BASE_URL}/videos`);
      // const data = await response.json();
      
      // Mock health videos data
      const mockVideos = [
        { id: 1, title: '10-Minute Morning Yoga', category: 'Exercise', duration: '10:00', thumbnail: '/placeholder.svg' },
        { id: 2, title: 'Healthy Heart Tips', category: 'Education', duration: '5:30', thumbnail: '/placeholder.svg' },
        { id: 3, title: 'Meditation for Sleep', category: 'Wellness', duration: '15:00', thumbnail: '/placeholder.svg' }
      ];
      
      setTimeout(() => {
        setVideos(mockVideos);
        setLoading(false);
      }, 600);
    } catch (err) {
      setError('Failed to fetch health videos');
      setLoading(false);
    }
  };

  return { videos, loading, error, fetchVideos };
};

// Chat API Hook
export const useChatAPI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = async (message: string) => {
    setLoading(true);
    setError(null);
    try {
      // TODO: Replace with actual API call to /api/chat
      // const response = await fetch(`${API_BASE_URL}/chat`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ message })
      // });
      // const data = await response.json();
      
      // Mock AI response
      const mockResponses = [
        "Based on your health data, I recommend staying hydrated and maintaining regular exercise.",
        "I've analyzed your symptoms. Consider scheduling a check-up if these persist.",
        "Your vital signs look good. Focus on consistent sleep and balanced nutrition.",
        "I notice patterns in your metrics. Here are personalized recommendations...",
        "That's a great question! Based on medical guidelines, here's what I recommend..."
      ];
      
      return new Promise((resolve) => {
        setTimeout(() => {
          const response = { reply: mockResponses[Math.floor(Math.random() * mockResponses.length)] };
          setLoading(false);
          resolve(response);
        }, 1500);
      });
    } catch (err) {
      setError('Failed to get AI response');
      setLoading(false);
      throw err;
    }
  };

  return { sendMessage, loading, error };
};

// Symptoms API Hook
export const useSymptomsAPI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyzeSymptoms = async (symptoms: string[]) => {
    setLoading(true);
    setError(null);
    try {
      // TODO: Replace with actual API call to /api/symptoms
      // const response = await fetch(`${API_BASE_URL}/symptoms`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ symptoms })
      // });
      // const data = await response.json();
      
      // Mock symptom analysis
      const mockConditions = [
        { name: 'Common Cold', probability: 0.75, severity: 'mild' },
        { name: 'Seasonal Allergies', probability: 0.60, severity: 'mild' },
        { name: 'Viral Infection', probability: 0.45, severity: 'moderate' }
      ];
      
      return new Promise((resolve) => {
        setTimeout(() => {
          const response = { conditions: mockConditions };
          setLoading(false);
          resolve(response);
        }, 2000);
      });
    } catch (err) {
      setError('Failed to analyze symptoms');
      setLoading(false);
      throw err;
    }
  };

  return { analyzeSymptoms, loading, error };
};

// BMI API Hook
export const useBMIAPI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const calculateBMI = async (weight: number, height: number, unit: 'metric' | 'imperial') => {
    setLoading(true);
    setError(null);
    try {
      // TODO: Replace with actual API call to /api/bmi
      // const response = await fetch(`${API_BASE_URL}/bmi`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ weight, height, unit })
      // });
      // const data = await response.json();
      
      // Local BMI calculation for now
      let bmi: number;
      if (unit === 'metric') {
        bmi = weight / (height * height);
      } else {
        bmi = (weight / (height * height)) * 703;
      }
      
      let category: string;
      let risk: string;
      if (bmi < 18.5) {
        category = 'Underweight';
        risk = 'Increased risk of malnutrition';
      } else if (bmi < 25) {
        category = 'Normal';
        risk = 'Low risk';
      } else if (bmi < 30) {
        category = 'Overweight';
        risk = 'Increased risk of health issues';
      } else {
        category = 'Obese';
        risk = 'High risk of health complications';
      }
      
      return new Promise((resolve) => {
        setTimeout(() => {
          const response = { bmi: parseFloat(bmi.toFixed(1)), category, risk };
          setLoading(false);
          resolve(response);
        }, 800);
      });
    } catch (err) {
      setError('Failed to calculate BMI');
      setLoading(false);
      throw err;
    }
  };

  return { calculateBMI, loading, error };
};