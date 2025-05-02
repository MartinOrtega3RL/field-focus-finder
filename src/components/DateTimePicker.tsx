
import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { es } from "date-fns/locale";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type TimeSlot = {
  id: string;
  time: string;
  available: boolean;
};

// Horarios disponibles para reserva
const timeSlots: TimeSlot[] = [
  { id: "1", time: "08:00 - 09:00", available: true },
  { id: "2", time: "09:00 - 10:00", available: true },
  { id: "3", time: "10:00 - 11:00", available: true },
  { id: "4", time: "11:00 - 12:00", available: true },
  { id: "5", time: "12:00 - 13:00", available: true },
  { id: "6", time: "13:00 - 14:00", available: false },
  { id: "7", time: "14:00 - 15:00", available: true },
  { id: "8", time: "15:00 - 16:00", available: true },
  { id: "9", time: "16:00 - 17:00", available: true },
  { id: "10", time: "17:00 - 18:00", available: true },
  { id: "11", time: "18:00 - 19:00", available: true },
  { id: "12", time: "19:00 - 20:00", available: true },
  { id: "13", time: "20:00 - 21:00", available: true },
  { id: "14", time: "21:00 - 22:00", available: true },
];

interface DateTimePickerProps {
  onDateTimeSelected: (date: Date | undefined, timeSlot: string | undefined) => void;
}

export function DateTimePicker({ onDateTimeSelected }: DateTimePickerProps) {
  const [date, setDate] = React.useState<Date>();
  const [selectedTimeSlot, setSelectedTimeSlot] = React.useState<string>();

  const handleDateChange = (newDate: Date | undefined) => {
    setDate(newDate);
    onDateTimeSelected(newDate, selectedTimeSlot);
  };

  const handleTimeSlotChange = (timeSlotId: string) => {
    setSelectedTimeSlot(timeSlotId);
    onDateTimeSelected(date, timeSlotId);
  };

  return (
    <Card className="bg-sport-blue border-white/10">
      <CardHeader>
        <CardTitle className="text-white text-2xl">Selecciona Fecha y Horario</CardTitle>
        <CardDescription className="text-muted">
          Elige el día y horario para tu reserva
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="w-full md:w-auto">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full md:w-[280px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? (
                    format(date, "PPP", { locale: es })
                  ) : (
                    <span>Selecciona una fecha</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={handleDateChange}
                  initialFocus
                  locale={es}
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>

            {date && (
              <div className="mt-4 text-white">
                <p className="mb-2 font-medium">Fecha seleccionada:</p>
                <p className="font-bold">{format(date, "PPPP", { locale: es })}</p>
              </div>
            )}
          </div>

          <div className="w-full">
            <h3 className="text-white font-medium mb-3">Horarios disponibles:</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {timeSlots.map((slot) => (
                <Button
                  key={slot.id}
                  variant={selectedTimeSlot === slot.id ? "default" : "outline"}
                  className={cn(
                    "w-full",
                    !slot.available && "opacity-50 cursor-not-allowed",
                    selectedTimeSlot === slot.id && "bg-sport-yellow text-black"
                  )}
                  disabled={!slot.available}
                  onClick={() => handleTimeSlotChange(slot.id)}
                >
                  {slot.time}
                </Button>
              ))}
            </div>
            {selectedTimeSlot && (
              <div className="mt-4 text-white">
                <p className="font-medium">
                  Horario seleccionado: {" "}
                  <span className="font-bold">
                    {timeSlots.find(slot => slot.id === selectedTimeSlot)?.time}
                  </span>
                </p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default DateTimePicker;
