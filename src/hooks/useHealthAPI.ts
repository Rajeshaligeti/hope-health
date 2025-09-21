import { useState, useEffect } from 'react';

// Hardcoded API keys
const GEMINI_API_KEY = 'AIzaSyBPohiYFxkQvpmmzI9okSM8J2zVVV3dBkA';
const GOOGLE_API_KEY = 'AIzaSyBIU9JtDpU_ymL5VHuzfwp6ETVop7VvWKc';

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

  const fetchVideos = async (query = 'health wellness exercise') => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=10&key=${GOOGLE_API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch videos');
      }
      
      const data = await response.json();
      const videoData = data.items?.map((item: any) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        youtubeId: item.id.videoId,
        category: 'Health',
        duration: '5:00',
        thumbnail: item.snippet.thumbnails?.medium?.url || '/placeholder.svg'
      })) || [];
      
      setVideos(videoData);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch health videos');
      // Fallback to mock data if API fails
      const mockVideos = [
        { id: 1, title: '10-Minute Morning Yoga', category: 'Exercise', duration: '10:00', thumbnail: '/placeholder.svg' },
        { id: 2, title: 'Healthy Heart Tips', category: 'Education', duration: '5:30', thumbnail: '/placeholder.svg' },
        { id: 3, title: 'Meditation for Sleep', category: 'Wellness', duration: '15:00', thumbnail: '/placeholder.svg' }
      ];
      setVideos(mockVideos);
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
      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=' + GEMINI_API_KEY, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are HOPE, a healthcare AI assistant. Provide helpful, accurate health information and guidance. User message: ${message}`
            }]
          }]
        })
      });
      
      const data = await response.json();
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'I apologize, but I cannot provide a response at this time.';
      
      setLoading(false);
      return { reply };
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
      const symptomsText = symptoms.join(', ');
      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=' + GEMINI_API_KEY, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `As a medical AI, analyze these symptoms: ${symptomsText}. Provide a JSON response with an array of possible conditions, each having: name, probability (0-1), severity (low/medium/high), and recommendations array. Be informative but remind users to consult healthcare professionals.`
            }]
          }]
        })
      });
      
      const data = await response.json();
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
      
      try {
        const parsed = JSON.parse(reply);
        setLoading(false);
        return { conditions: parsed.conditions || parsed };
      } catch {
        // Fallback if JSON parsing fails
        const conditions = [
          { name: 'Please consult a healthcare professional', probability: 1.0, severity: 'medium', recommendations: ['Schedule an appointment with your doctor', 'Monitor symptoms closely'] }
        ];
        setLoading(false);
        return { conditions };
      }
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