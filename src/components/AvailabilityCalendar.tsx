
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Availability } from '@/types/field';

interface AvailabilityCalendarProps {
  availability: Availability;
}

const AvailabilityCalendar = ({ availability }: AvailabilityCalendarProps) => {
  const [selectedDay, setSelectedDay] = useState("monday");
  const weekDays = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
  
  return (
    <div className="mt-2">
      <h3 className="text-lg font-bold mb-2">Weekly Availability</h3>
      <Tabs defaultValue={selectedDay} onValueChange={setSelectedDay} className="w-full">
        <TabsList className="w-full grid grid-cols-7">
          {weekDays.map((day) => (
            <TabsTrigger 
              key={day} 
              value={day}
              className="text-xs capitalize"
            >
              {day.substring(0, 3)}
            </TabsTrigger>
          ))}
        </TabsList>
        {weekDays.map((day) => (
          <TabsContent key={day} value={day} className="mt-2">
            <div className="grid grid-cols-2 gap-2">
              {availability[day as keyof Availability].length > 0 ? (
                availability[day as keyof Availability].map((slot, index) => (
                  <div key={index} className="bg-sport-blue/5 p-2 rounded-md flex items-center justify-between">
                    <span className="text-sm font-medium">{slot}</span>
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  </div>
                ))
              ) : (
                <div className="col-span-2 text-center py-4 text-muted-foreground">
                  No available slots
                </div>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default AvailabilityCalendar;
