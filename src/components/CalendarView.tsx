import { useState, memo } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Plus, Clock, Pill, Activity } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface CalendarEvent {
  id: string;
  title: string;
  time: string;
  type: 'medication' | 'appointment' | 'reminder' | 'exercise';
  status: 'completed' | 'pending' | 'missed';
  description?: string;
}

const CalendarView = memo(() => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Mock calendar events
  const events: Record<string, CalendarEvent[]> = {
    '2024-01-15': [
      {
        id: '1',
        title: 'Vitamin D3',
        time: '9:00 AM',
        type: 'medication',
        status: 'completed',
        description: '1000 IU daily supplement'
      },
      {
        id: '2',
        title: 'Morning Walk',
        time: '7:00 AM',
        type: 'exercise',
        status: 'completed',
        description: '30 minute walk in the park'
      }
    ],
    '2024-01-16': [
      {
        id: '3',
        title: 'Blood Pressure Check',
        time: '2:00 PM',
        type: 'reminder',
        status: 'pending',
        description: 'Monitor and record readings'
      },
      {
        id: '4',
        title: 'Omega-3',
        time: '7:00 PM',
        type: 'medication',
        status: 'pending',
        description: '1000mg with dinner'
      }
    ],
    '2024-01-17': [
      {
        id: '5',
        title: 'Doctor Appointment',
        time: '10:30 AM',
        type: 'appointment',
        status: 'pending',
        description: 'Regular check-up with Dr. Smith'
      }
    ]
  };

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDateKey = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date: Date) => {
    return date.toDateString() === selectedDate.toDateString();
  };

  const getEventTypeIcon = (type: CalendarEvent['type']) => {
    switch (type) {
      case 'medication': return <Pill className="w-3 h-3" />;
      case 'appointment': return <Calendar className="w-3 h-3" />;
      case 'reminder': return <Clock className="w-3 h-3" />;
      case 'exercise': return <Activity className="w-3 h-3" />;
      default: return <Clock className="w-3 h-3" />;
    }
  };

  const getEventTypeColor = (type: CalendarEvent['type']) => {
    switch (type) {
      case 'medication': return 'bg-primary/20 text-primary';
      case 'appointment': return 'bg-secondary/20 text-secondary';
      case 'reminder': return 'bg-accent/20 text-accent';
      case 'exercise': return 'bg-health-good/20 text-health-good';
      default: return 'bg-muted/20 text-muted-foreground';
    }
  };

  const getStatusColor = (status: CalendarEvent['status']) => {
    switch (status) {
      case 'completed': return 'status-good';
      case 'pending': return 'status-warning';
      case 'missed': return 'status-critical';
      default: return 'status-good';
    }
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const selectDate = (day: number) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(newDate);
  };

  const selectedDateEvents = events[formatDateKey(selectedDate)] || [];
  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="card-health lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-orbitron font-semibold text-xl flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Health Calendar
            </h2>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigateMonth('prev')}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="font-orbitron font-medium px-4">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigateMonth('next')}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 mb-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {/* Empty cells for days before month starts */}
            {Array.from({ length: firstDay }, (_, i) => (
              <div key={`empty-${i}`} className="p-2 h-12" />
            ))}
            
            {/* Days of the month */}
            {Array.from({ length: daysInMonth }, (_, i) => {
              const day = i + 1;
              const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
              const dateKey = formatDateKey(date);
              const dayEvents = events[dateKey] || [];
              
              return (
                <button
                  key={day}
                  onClick={() => selectDate(day)}
                  className={`
                    p-2 h-12 text-sm rounded-lg transition-all hover:bg-primary/10
                    ${isToday(date) ? 'bg-primary text-primary-foreground font-bold' : ''}
                    ${isSelected(date) ? 'ring-2 ring-primary' : ''}
                    ${dayEvents.length > 0 ? 'relative' : ''}
                  `}
                >
                  {day}
                  {dayEvents.length > 0 && (
                    <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
                      <div className="w-1 h-1 bg-secondary rounded-full" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </Card>

        {/* Events for Selected Date */}
        <Card className="card-health">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-orbitron font-semibold">
              {selectedDate.toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric',
                year: 'numeric'
              })}
            </h3>
            <Button size="sm" className="btn-primary">
              <Plus className="w-3 h-3 mr-1" />
              Add
            </Button>
          </div>

          <div className="space-y-3">
            {selectedDateEvents.length === 0 ? (
              <p className="text-muted-foreground text-sm text-center py-8">
                No events for this date
              </p>
            ) : (
              selectedDateEvents.map((event) => (
                <div
                  key={event.id}
                  className="p-3 rounded-lg border border-border/50 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge className={getEventTypeColor(event.type)}>
                        {getEventTypeIcon(event.type)}
                        <span className="ml-1 capitalize">{event.type}</span>
                      </Badge>
                    </div>
                    <span className={`text-xs font-medium ${getStatusColor(event.status)}`}>
                      {event.status}
                    </span>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">{event.title}</h4>
                    <p className="text-sm text-muted-foreground">{event.time}</p>
                    {event.description && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {event.description}
                      </p>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>
    </div>
  );
});

CalendarView.displayName = 'CalendarView';

export default CalendarView;