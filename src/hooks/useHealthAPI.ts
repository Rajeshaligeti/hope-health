import { useState, useEffect, useCallback, useRef, useMemo } from 'react';

// Environment variables for API keys
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

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
type Video = {
  id: string;
  title: string;
  description: string;
  youtubeId: string;
  category: string;
  duration: string;
  thumbnail: string;
  views: string;
  channel: string;
};

export const useHealthVideos = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const queryCache = useRef<Record<string, boolean>>({});
  const videosCache = useRef<Record<string, Video[]>>({});

  // Predefined mock videos to use as fallback
  const mockVideos = useMemo(() => [
    { 
      id: 'd1YbHr5hN7I', 
      title: '10-Minute Morning Yoga for Beginners', 
      description: 'Start your day with this gentle 10-minute yoga routine perfect for beginners.',
      category: 'fitness',
      duration: '10:00', 
      thumbnail: 'https://i.ytimg.com/vi/d1YbHr5hN7I/mqdefault.jpg',
      youtubeId: 'd1YbHr5hN7I',
      views: '1.2M',
      channel: 'Yoga With Adriene'
    },
    { 
      id: '3frcR2a4KMk', 
      title: '5 Superfoods to Boost Your Immune System', 
      description: 'Learn about 5 superfoods that can help strengthen your immune system naturally.',
      category: 'nutrition',
      duration: '8:45', 
      thumbnail: 'https://i.ytimg.com/vi/3frcR2a4KMk/mqdefault.jpg',
      youtubeId: '3frcR2a4KMk',
      views: '856K',
      channel: 'Healthline'
    },
    { 
      id: 'inpok4MKVLM', 
      title: 'Guided Meditation for Anxiety and Stress', 
      description: 'A 15-minute guided meditation to help reduce anxiety and stress.',
      category: 'mental',
      duration: '15:30', 
      thumbnail: 'https://i.ytimg.com/vi/inpok4MKVLM/mqdefault.jpg',
      youtubeId: 'inpok4MKVLM',
      views: '5.7M',
      channel: 'The Mindful Movement'
    }
  ], []);

  const fetchVideos = useCallback(async (query = 'health wellness exercise') => {
    const cacheKey = query.toLowerCase().trim();
    
    // Return cached results if available
    if (videosCache.current[cacheKey]) {
      setVideos(videosCache.current[cacheKey]);
      return;
    }
    
    // Skip if already loading this query
    if (queryCache.current[cacheKey]) return;
    
    setLoading(true);
    setError(null);
    
    try {
      queryCache.current[cacheKey] = true;
      
      // Make actual YouTube API call
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=10&key=${import.meta.env.VITE_GOOGLE_API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch videos from YouTube');
      }

      const data = await response.json();
      
      // Transform YouTube API response to our Video type
      const videoData: Video[] = data.items.map((item: any) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        youtubeId: item.id.videoId,
        category: getCategoryFromQuery(query),
        duration: '00:00', // Duration requires an additional API call
        thumbnail: item.snippet.thumbnails.medium.url,
        views: 'N/A', // Views requires an additional API call
        channel: item.snippet.channelTitle
      }));

      // Cache the results
      videosCache.current[cacheKey] = videoData;
      setVideos(videoData);
      
    } catch (err) {
      console.error('Error in fetchVideos:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch videos');
      // Fall back to mock videos in case of API failure
      setVideos(mockVideos);
    } finally {
      setLoading(false);
      queryCache.current[cacheKey] = false;
    }
  }, [mockVideos]);
  
  // Helper function to format ISO 8601 duration to human-readable format
  const formatDuration = (duration: string): string => {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    if (!match) return '0:00';
    
    const hours = parseInt(match[1]) || 0;
    const minutes = parseInt(match[2]) || 0;
    const seconds = parseInt(match[3]) || 0;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };
  
  // Helper function to determine category from query
  const getCategoryFromQuery = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    if (lowerQuery.includes('fitness') || lowerQuery.includes('workout') || lowerQuery.includes('exercise')) return 'fitness';
    if (lowerQuery.includes('nutrition') || lowerQuery.includes('diet') || lowerQuery.includes('food')) return 'nutrition';
    if (lowerQuery.includes('mental') || lowerQuery.includes('mindfulness') || lowerQuery.includes('meditation')) return 'mental';
    if (lowerQuery.includes('heart') || lowerQuery.includes('cardio') || lowerQuery.includes('cardiovascular')) return 'heart';
    return 'all';
  };

  // Load initial videos on component mount
  useEffect(() => {
    const fetchInitialVideos = async () => {
      await fetchVideos('health wellness exercise');
    };
    fetchInitialVideos();
  }, [fetchVideos]);

  return {
    videos,
    loading,
    error,
    fetchVideos
  };
};

// Chat API Hook
export const useChatAPI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const conversationHistory = useRef<{ role: 'user' | 'assistant', content: string }[]>([]);

  const sendMessage = async (message: string) => {
    setLoading(true);
    setError(null);
    try {
      // Add user message to history
      conversationHistory.current.push({ role: 'user', content: message });
      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=' + GEMINI_API_KEY, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are HOPE, a friendly AI health buddy who loves to chat about wellness and health! 

Style Guide:
- Be warm and casual, like a knowledgeable friend (not a textbook)
- Use natural conversational language ("Hey!", "You know what's cool about that?", etc.)
- Keep responses short (2-3 sentences)
- Break up longer info into chat-style messages
- Use emojis occasionally for warmth (but don't overdo it)
- Ask engaging follow-up questions
- Use bullet points and formal lists if needed
- Share information in a engaging way
- Keep medical terms simple unless the user asks for technical details
- Reference previous messages when relevant

Previous conversation:
${conversationHistory.current.map(msg => `${msg.role}: ${msg.content}`).join('\n')}

User's new message: ${message}

Remember to maintain conversation context and respond in a casual, friendly way while keeping the information accurate and helpful!`
            }]
          }]
        })
      });
      
      const data = await response.json();
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'I apologize, but I cannot provide a response at this time.';
      
      // Add assistant's response to history
      conversationHistory.current.push({ role: 'assistant', content: reply });
      
      // Keep only the last 10 messages to prevent the context from getting too long
      if (conversationHistory.current.length > 10) {
        conversationHistory.current = conversationHistory.current.slice(-10);
      }
      
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