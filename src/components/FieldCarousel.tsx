import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowLeft, ArrowRight } from 'lucide-react';
interface CarouselImage {
  url: string;
  title: string;
  description: string;
}
const images: CarouselImage[] = [{
  url: "https://images.unsplash.com/photo-1599018552443-1d5f67f93e85?q=80&w=1920&auto=format&fit=crop",
  title: "Soccer Fields",
  description: "Professional fields for soccer enthusiasts"
}, {
  url: "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1920&auto=format&fit=crop",
  title: "Basketball Courts",
  description: "Indoor and outdoor courts available"
}, {
  url: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?q=80&w=1920&auto=format&fit=crop",
  title: "Tennis Courts",
  description: "Clay, grass and hard courts"
}, {
  url: "https://images.unsplash.com/photo-1611372096324-cfb1c5b0ca59?q=80&w=1920&auto=format&fit=crop",
  title: "Swimming Pools",
  description: "Olympic sized pools for training and recreation"
}];
const FieldCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const goToNext = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
    }
  };
  const goToPrevious = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex(prevIndex => (prevIndex - 1 + images.length) % images.length);
    }
  };
  const goToSlide = (index: number) => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex(index);
    }
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [currentIndex]);
  useEffect(() => {
    const intervalId = setInterval(() => {
      goToNext();
    }, 5000);
    return () => clearInterval(intervalId);
  }, [isTransitioning]);
  return <div className="relative w-full h-[500px] overflow-hidden rounded-lg">
      {/* Carousel images */}
      {images.map((image, index) => <div key={index} className={cn("absolute top-0 left-0 w-full h-full transition-opacity duration-500", index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0")}>
          <div className="absolute inset-0 bg-sport-blue/50 z-10" />
          <img src={image.url} alt={image.title} className="w-full h-full object-cover object-center" />
          
        </div>)}

      {/* Navigation buttons */}
      <Button variant="outline" size="icon" className="absolute top-1/2 left-4 z-30 bg-white/20 backdrop-blur-sm border-white/10 hover:bg-white/30" onClick={goToPrevious}>
        <ArrowLeft className="h-4 w-4 text-white" />
      </Button>
      <Button variant="outline" size="icon" className="absolute top-1/2 right-4 z-30 bg-white/20 backdrop-blur-sm border-white/10 hover:bg-white/30" onClick={goToNext}>
        <ArrowRight className="h-4 w-4 text-white" />
      </Button>

      {/* Indicator dots */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2">
        {images.map((_, index) => <button key={index} onClick={() => goToSlide(index)} className={cn("w-2.5 h-2.5 rounded-full transition-all duration-300", index === currentIndex ? "bg-white scale-125" : "bg-white/50 hover:bg-white/80")} aria-label={`Go to slide ${index + 1}`} />)}
      </div>
    </div>;
};
export default FieldCarousel;