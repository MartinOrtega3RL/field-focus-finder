import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Calendar, Clock } from "lucide-react";
import { Field } from "@/types/field";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { cn } from "@/lib/utils";

interface FieldCardProps {
  field: Field;
  selectedDate: Date;
}

const FieldCard = ({ field, selectedDate }: FieldCardProps) => {
  const [showTimeSlots, setShowTimeSlots] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);

  // Convertir el día seleccionado a un formato compatible con las propiedades de disponibilidad
  const dayOfWeek = format(selectedDate, 'EEEE', { locale: es }).toLowerCase();
  
  // Mapear los días en español a las propiedades en inglés de field.availability
  const dayMapping: Record<string, keyof typeof field.availability> = {
    'lunes': 'monday',
    'martes': 'tuesday',
    'miércoles': 'wednesday',
    'jueves': 'thursday',
    'viernes': 'friday',
    'sábado': 'saturday',
    'domingo': 'sunday'
  };
  
  const availableTimeSlots = field.availability[dayMapping[dayOfWeek] || 'monday'];

  const handleBooking = () => {
    if (selectedTimeSlot) {
      setShowConfirmDialog(true);
    }
  };

  const confirmBooking = () => {
    // Aquí iría la lógica para confirmar la reserva
    setShowConfirmDialog(false);
    setSelectedTimeSlot(null);
    // También podríamos mostrar una notificación de éxito
  };

  const handleTimeSlotSelect = (timeSlot: string) => {
    setSelectedTimeSlot(timeSlot === selectedTimeSlot ? null : timeSlot);
  };

  return (
    <Card className="sport-card w-full">
      <div className="relative h-52 overflow-hidden">
        <img 
          src={field.imageUrl} 
          alt={field.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 flex gap-2">
          {field.features.map((feature, index) => (
            <Badge key={index} className="sport-badge">{feature}</Badge>
          ))}
        </div>
      </div>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl">{field.name}</CardTitle>
          <span className="text-sm text-muted-foreground">{field.location}</span>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">{field.description}</p>
        <div className="flex justify-between items-center mb-4">
          <div>
            <span className="font-bold text-sport-blue">{field.price}</span>
            <span className="text-muted-foreground">/hora</span>
          </div>
          <Badge 
            variant={field.status === 'Available' ? "default" : "outline"}
            className={field.status === 'Available' ? "bg-green-500" : ""}
          >
            {field.status === 'Available' ? 'Disponible' : 'No Disponible'}
          </Badge>
        </div>
        
        <Button 
          variant="outline" 
          onClick={() => setShowTimeSlots(!showTimeSlots)}
          className="flex items-center gap-2 w-full mb-2"
        >
          <Clock size={16} />
          {showTimeSlots ? "Ocultar Horarios" : "Ver Horarios Disponibles"}
        </Button>
        
        {showTimeSlots && (
          <div className="mt-4">
            <h4 className="font-medium mb-2">
              Horarios para {format(selectedDate, 'EEEE d MMMM', { locale: es })}:
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {availableTimeSlots.length > 0 ? (
                availableTimeSlots.map((slot, index) => (
                  <Button
                    key={index}
                    variant={selectedTimeSlot === slot ? "default" : "outline"}
                    className={cn(
                      "relative",
                      selectedTimeSlot === slot && "bg-sport-yellow text-black"
                    )}
                    onClick={() => handleTimeSlotSelect(slot)}
                  >
                    {slot}
                    <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-green-500"></div>
                  </Button>
                ))
              ) : (
                <p className="col-span-3 text-center text-muted-foreground py-2">
                  No hay horarios disponibles para este día
                </p>
              )}
            </div>
            
            {selectedTimeSlot && (
              <div className="mt-4 text-center">
                <p className="font-medium">
                  Horario seleccionado: <span className="font-bold">{selectedTimeSlot}</span>
                </p>
                <Button 
                  className="sport-button mt-3 w-full" 
                  onClick={handleBooking}
                >
                  Reservar Este Horario
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <div className="text-sm text-muted-foreground flex items-center gap-1">
          <Calendar size={14} />
          {format(selectedDate, "d MMM", { locale: es })}
        </div>
        {!showTimeSlots && (
          <Button 
            className="sport-button" 
            onClick={() => setShowTimeSlots(true)}
          >
            Elegir Horario
          </Button>
        )}
      </CardFooter>

      {/* Modal de confirmación de reserva */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Reserva</DialogTitle>
            <DialogDescription>
              Estás a punto de reservar {field.name} en {field.location}.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <p className="text-muted-foreground mb-2">
              Fecha: <span className="font-semibold text-foreground">
                {format(selectedDate, 'EEEE d MMMM, yyyy', { locale: es })}
              </span>
            </p>
            <p className="text-muted-foreground mb-2">
              Hora: <span className="font-semibold text-foreground">{selectedTimeSlot}</span>
            </p>
            <p className="text-muted-foreground">
              Precio: <span className="font-semibold text-foreground">{field.price}/hora</span>
            </p>
            {field.features.length > 0 && (
              <div className="mt-3">
                <p className="text-sm font-medium mb-1">Características:</p>
                <div className="flex flex-wrap gap-1">
                  {field.features.map((feature, index) => (
                    <Badge key={index} variant="outline">{feature}</Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>Cancelar</Button>
            <Button onClick={confirmBooking} className="bg-green-600 hover:bg-green-700">
              <CheckCircle className="mr-2 h-4 w-4" />
              Confirmar Reserva
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default FieldCard;
