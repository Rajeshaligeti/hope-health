import { memo } from 'react';
import CalendarView from '@/components/CalendarView';

const CalendarPage = memo(() => {
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="p-6 pb-0">
          <h1 className="font-orbitron font-bold text-3xl mb-2">Health Calendar</h1>
          <p className="text-muted-foreground">
            Manage your medication schedule, appointments, and health reminders
          </p>
        </div>
        
        <CalendarView />
      </div>
    </div>
  );
});

CalendarPage.displayName = 'CalendarPage';

export default CalendarPage;