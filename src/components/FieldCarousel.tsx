
import { useState, useEffect } from 'react';
import { Carousel, Button as AntButton, Typography } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

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

const { Title, Text } = Typography;

const FieldCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = React.useRef<any>(null);
  const isMobile = useIsMobile();

  const goToNext = () => {
    carouselRef.current?.next();
  };

  const goToPrevious = () => {
    carouselRef.current?.prev();
  };

  const afterChange = (current: number) => {
    setCurrentIndex(current);
  };

  return (
    <div className={cn("relative w-full overflow-hidden rounded-lg", isMobile ? "h-[300px]" : "h-[500px]")}>
      <Carousel 
        ref={carouselRef} 
        afterChange={afterChange} 
        autoplay 
        effect="fade"
        dots={{ className: 'custom-dots' }}
      >
        {images.map((image, index) => (
          <div key={index}>
            <div className="relative h-full">
              <div className="absolute inset-0 bg-sport-blue/50 z-10" />
              <img 
                src={image.url} 
                alt={image.title} 
                className={cn("w-full object-cover object-center", isMobile ? "h-[300px]" : "h-[500px]")} 
              />
              
              {/* Image content/caption - now using Ant Design Typography */}
              <div className="absolute bottom-0 left-0 w-full p-4 md:p-6 z-20 bg-gradient-to-t from-black/80 to-transparent">
                <Title level={isMobile ? 4 : 3} style={{ color: 'white', margin: '0' }}>{image.title}</Title>
                <Text style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: isMobile ? '14px' : '16px' }}>
                  {image.description}
                </Text>
              </div>
            </div>
          </div>
        ))}
      </Carousel>

      {/* Navigation buttons - now using Ant Design Button */}
      <AntButton 
        icon={<LeftOutlined />}
        shape="circle" 
        className={cn(
          "absolute top-1/2 left-2 md:left-4 z-30 bg-white/20 backdrop-blur-sm",
          "transform -translate-y-1/2"
        )}
        style={{ border: '1px solid rgba(255, 255, 255, 0.1)' }}
        onClick={goToPrevious}
        size={isMobile ? "small" : "middle"}
      />
      <AntButton 
        icon={<RightOutlined />}
        shape="circle" 
        className={cn(
          "absolute top-1/2 right-2 md:right-4 z-30 bg-white/20 backdrop-blur-sm",
          "transform -translate-y-1/2"
        )}
        style={{ border: '1px solid rgba(255, 255, 255, 0.1)' }}
        onClick={goToNext}
        size={isMobile ? "small" : "middle"}
      />

      {/* Custom indicator dots */}
      <div className={cn(
        "absolute z-30 flex space-x-2",
        isMobile ? "bottom-16 left-1/2 transform -translate-x-1/2" : "bottom-20 left-1/2 transform -translate-x-1/2"
      )}>
        {images.map((_, index) => (
          <button 
            key={index} 
            onClick={() => carouselRef.current?.goTo(index)} 
            className={cn(
              "rounded-full transition-all duration-300",
              index === currentIndex ? "bg-white scale-125" : "bg-white/50 hover:bg-white/80",
              isMobile ? "w-2 h-2" : "w-2.5 h-2.5"
            )} 
            aria-label={`Go to slide ${index + 1}`} 
          />
        ))}
      </div>

      {/* Custom styles for Ant Design carousel dots */}
      <style jsx global>{`
        .custom-dots {
          display: none !important;
        }
        .ant-carousel .slick-dots li button {
          background: rgba(255, 255, 255, 0.5);
        }
        .ant-carousel .slick-dots li.slick-active button {
          background: white;
        }
      `}</style>
    </div>
  );
};

export default FieldCarousel;
