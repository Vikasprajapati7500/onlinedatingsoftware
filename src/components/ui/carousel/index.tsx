import * as React from "react";

// Define the props types
interface CarouselProps {
  children: React.ReactNode;
}

interface CarouselItemProps {
  children: React.ReactNode;
}

interface CarouselButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}

export const Carousel: React.FC<CarouselProps> = ({ children }) => {
  return <div >{children}</div>;
};

export const CarouselContent: React.FC<CarouselProps> = ({ children }) => {
  return <div >{children}</div>;
};

export const CarouselItem: React.FC<CarouselItemProps> = ({ children }) => {
  return <div >{children}</div>;
};

export const CarouselNext: React.FC<CarouselButtonProps> = ({ children, onClick }) => {
  return (
    <button  onClick={onClick}>
      {children}
    </button>
  );
};

export const CarouselPrevious: React.FC<CarouselButtonProps> = ({ children, onClick }) => {
  return (
    <button onClick={onClick}>
      {children}
    </button>
  );
};
