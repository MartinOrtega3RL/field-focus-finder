
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

interface DatePickerProps {
  onDateSelected: (date: Date | undefined) => void;
  selectedDate?: Date;
}

export function DateTimePicker({ onDateSelected, selectedDate }: DatePickerProps) {
  const handleDateChange = (newDate: Date | undefined) => {
    onDateSelected(newDate);
  };

  return (
    <Card className="bg-sport-blue border-white/10">
      <CardHeader>
        <CardTitle className="text-white text-2xl">Selecciona Fecha</CardTitle>
        <CardDescription className="text-muted">
          Elige el día para ver canchas disponibles
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center">
          <div className="w-full md:w-auto mb-6">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full md:w-[280px] justify-start text-left font-normal",
                    !selectedDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? (
                    format(selectedDate, "PPP", { locale: es })
                  ) : (
                    <span>Selecciona una fecha</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateChange}
                  initialFocus
                  locale={es}
                  className="pointer-events-auto"
                  fromDate={new Date()} // Permitir solo fechas desde hoy en adelante
                />
              </PopoverContent>
            </Popover>

            {selectedDate && (
              <div className="mt-4 text-white text-center">
                <p className="mb-2 font-medium">Fecha seleccionada:</p>
                <p className="font-bold">{format(selectedDate, "PPPP", { locale: es })}</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default DateTimePicker;
