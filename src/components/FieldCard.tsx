
import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { Field } from "@/types/field";
import AvailabilityCalendar from './AvailabilityCalendar';

interface FieldCardProps {
  field: Field;
}

const FieldCard = ({ field }: FieldCardProps) => {
  const [showAvailability, setShowAvailability] = useState(false);

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
            <span className="text-muted-foreground">/hour</span>
          </div>
          <Badge 
            variant={field.status === 'Available' ? "default" : "outline"}
            className={field.status === 'Available' ? "bg-green-500" : ""}
          >
            {field.status}
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
          {showAvailability ? "Hide Availability" : "Show Availability"}
        </Button>
        <Button className="sport-button">Book Now</Button>
      </CardFooter>
      {showAvailability && (
        <div className="px-6 pb-6">
          <AvailabilityCalendar availability={field.availability} />
        </div>
      )}
    </Card>
  );
};

export default FieldCard;
