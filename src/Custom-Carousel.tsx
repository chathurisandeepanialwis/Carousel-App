import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState } from "react";
import { Button } from "./components/ui/button";

export const CustomCarousel = () => {
  const [carouselAPI, setCarouselAPI] = useState<CarouselApi | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false); // Add state for autoplay pause

  const onSelect = useCallback(() => {
    if (!carouselAPI) return;

    setSelectedIndex(carouselAPI.selectedScrollSnap());
  }, [carouselAPI]);

  const scrollTo = (index: number) => {
    if (!carouselAPI) return;

    carouselAPI.scrollTo(index);
    setIsAutoplayPaused(true); 
  };

  const scrollPrev = () => {
    if (!carouselAPI) return;
    carouselAPI.scrollPrev();
    setIsAutoplayPaused(true);
  };

  const scrollNext = () => {
    if (!carouselAPI) return;
    carouselAPI.scrollNext();
    setIsAutoplayPaused(true);
  };

  useEffect(() => {
    if (!carouselAPI) return;

    onSelect();

    setScrollSnaps(carouselAPI.scrollSnapList());

    carouselAPI.on("select", onSelect);
  }, [carouselAPI, onSelect]);

  const imagePaths = [
    "https://images.unsplash.com/photo-1533743983669-94fa5c4338ec?q=80&w=1992&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.pexels.com/photos/50577/hedgehog-animal-baby-cute-50577.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.unsplash.com/photo-1670558970624-4fa5a5d6b87b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGJpcmQlMjBwZXR8ZW58MHwwfDB8fHwy",
    "https://images.unsplash.com/photo-1544552866-d3ed42536cfd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fGZpc2h8ZW58MHwwfDB8fHwy",
    "https://images.unsplash.com/photo-1591561582301-7ce6588cc286?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmFiYml0fGVufDB8MHwwfHx8Mg%3D%3D",
    "https://images.pexels.com/photos/5264087/pexels-photo-5264087.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.unsplash.com/photo-1554692918-08fa0fdc9db3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGN1dGUlMjBwZXR8ZW58MHwwfDB8fHwy",
    
  ];

  return (
    <div className="relative">
      <Carousel
        plugins={[Autoplay({ delay: 2500, stopOnInteraction: false, disabled: isAutoplayPaused })]}
        opts={{ loop: true, align: "center" }}
        setApi={setCarouselAPI}
      >
        <CarouselContent>
          {imagePaths.map((imagePath, index) => (
            <CarouselItem key={index} className="md:basis-1/2">
              <div className="h-[16rem] md:h-[20rem] flex items-center justify-center">
                <img
                  src={imagePath}
                  alt={`Carousel image ${index + 1}`}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="absolute top-1/2 transform -translate-y-1/2 left-2 z-10">
        <Button onClick={scrollPrev} size="icon">
          {"<"}
        </Button>
      </div>
      <div className="absolute top-1/2 transform -translate-y-1/2 right-2 z-10">
        <Button onClick={scrollNext} size="icon">
          {">"}
        </Button>
      </div>

      <div className="flex justify-center mt-4 space-x-2">
        {scrollSnaps.map((_, index) => (
          <Button
            key={index}
            onClick={() => scrollTo(index)}
            size="icon"
            className={`w-2 h-2 rounded-full ${
              selectedIndex === index ? "bg-primary" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};