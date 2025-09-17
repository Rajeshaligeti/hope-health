// Mock health data for demonstration
export const healthMetrics = {
  heartRate: {
    current: 72,
    data: [
      { time: '6AM', value: 68 },
      { time: '9AM', value: 72 },
      { time: '12PM', value: 78 },
      { time: '3PM', value: 74 },
      { time: '6PM', value: 76 },
      { time: '9PM', value: 70 },
    ],
    status: 'good' as const,
    unit: 'bpm'
  },
  bloodPressure: {
    systolic: 120,
    diastolic: 80,
    status: 'excellent' as const,
    data: [
      { date: 'Mon', systolic: 118, diastolic: 78 },
      { date: 'Tue', systolic: 120, diastolic: 80 },
      { date: 'Wed', systolic: 122, diastolic: 82 },
      { date: 'Thu', systolic: 119, diastolic: 79 },
      { date: 'Fri', systolic: 121, diastolic: 81 },
    ]
  },
  steps: {
    current: 8500,
    goal: 10000,
    data: [
      { day: 'Sun', steps: 4200 },
      { day: 'Mon', steps: 7800 },
      { day: 'Tue', steps: 10200 },
      { day: 'Wed', steps: 8500 },
      { day: 'Thu', steps: 9200 },
      { day: 'Fri', steps: 11000 },
      { day: 'Sat', steps: 6800 },
    ],
    status: 'good' as const
  },
  sleep: {
    current: 7.2,
    goal: 8,
    data: [
      { night: 'Sun', hours: 6.5, deep: 2.1, rem: 1.8 },
      { night: 'Mon', hours: 7.8, deep: 2.4, rem: 2.1 },
      { night: 'Tue', hours: 8.2, deep: 2.8, rem: 2.3 },
      { night: 'Wed', hours: 6.1, deep: 1.9, rem: 1.5 },
      { night: 'Thu', hours: 7.4, deep: 2.2, rem: 2.0 },
      { night: 'Fri', hours: 7.9, deep: 2.5, rem: 2.2 },
    ],
    status: 'good' as const
  }
};

export const upcomingReminders = [
  {
    id: '1',
    medication: 'Vitamin D3',
    time: '9:00 AM',
    dosage: '1000 IU',
    type: 'supplement' as const,
    status: 'pending' as const
  },
  {
    id: '2',
    medication: 'Blood Pressure Check',
    time: '2:00 PM',
    dosage: 'Monitor readings',
    type: 'checkup' as const,
    status: 'pending' as const
  },
  {
    id: '3',
    medication: 'Omega-3',
    time: '7:00 PM',
    dosage: '1000mg',
    type: 'supplement' as const,
    status: 'pending' as const
  }
];

export const chatHistory = [
  {
    id: '1',
    type: 'ai' as const,
    message: 'Hello! I\'m HOPE, your healthcare assistant. How can I help you today?',
    timestamp: new Date(Date.now() - 5000)
  },
  {
    id: '2',
    type: 'user' as const,
    message: 'I\'ve been having headaches lately. What could be causing them?',
    timestamp: new Date(Date.now() - 3000)
  },
  {
    id: '3',
    type: 'ai' as const,
    message: 'Headaches can have various causes including stress, dehydration, lack of sleep, or eye strain. Based on your recent sleep data showing some inconsistent patterns, I\'d recommend: 1) Ensuring adequate hydration, 2) Maintaining regular sleep schedule, 3) Taking breaks from screen time. Would you like me to schedule a reminder for a doctor consultation if symptoms persist?',
    timestamp: new Date(Date.now() - 1000)
  }
];