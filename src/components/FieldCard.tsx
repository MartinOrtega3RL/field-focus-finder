
import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { Field } from "@/types/field";
import AvailabilityCalendar from './AvailabilityCalendar';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface FieldCardProps {
  field: Field;
}

const FieldCard = ({ field }: FieldCardProps) => {
  const [showAvailability, setShowAvailability] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const handleBooking = () => {
    setShowConfirmDialog(true);
  };

  const confirmBooking = () => {
    // Aquí iría la lógica para confirmar la reserva
    setShowConfirmDialog(false);
    // También podríamos mostrar una notificación de éxito
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
        <div className="flex justify-between items-center">
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
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <Button 
          variant="outline" 
          onClick={() => setShowAvailability(!showAvailability)}
          className="flex items-center gap-2"
        >
          <Calendar size={16} />
          {showAvailability ? "Ocultar Disponibilidad" : "Ver Disponibilidad"}
        </Button>
        <Button className="sport-button" onClick={handleBooking}>Reservar Ahora</Button>
      </CardFooter>
      {showAvailability && (
        <div className="px-6 pb-6">
          <AvailabilityCalendar availability={field.availability} />
        </div>
      )}

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
            <p className="text-muted-foreground">
              Precio: <span className="font-semibold text-foreground">{field.price}/hora</span>
            </p>
            {field.features.length > 0 && (
              <div className="mt-2">
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
            <Button onClick={confirmBooking}>Confirmar Reserva</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default FieldCard;
