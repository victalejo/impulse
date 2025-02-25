// components/custom/service-hover-select.tsx
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react"

export const ServiceHoverSelect = ({ 
  options,
  serviceType,
  onValueChange,
  disabled,
  onImageChange
}: { 
  options: string[],
  serviceType: string,
  onValueChange: (value: string) => void,
  disabled?: boolean,
  onImageChange: (imageSrc: string) => void
}) => {
  const getImageSource = (option: string) => {
    const imageMap: { [key: string]: string } = {
      "Silverwave Pontoon": "/images/silverwave-fondo.png",
      "Qwest Pontoon": "/images/Qwest-fondo.png",
      "Ice Pops Mega Front Loader": "/images/bounce.PNG",
      "Foam Party Package": "/images/foam-party.JPG",
      "Color Foam Party Package": "/images/foamcolor.JPG",
      "Glow in the Dark Foam Party Package": "/images/fotofoamnoche.jpg",
      "Foam Pit Package": "/images/foampit.png",
      "GMC Yukon AT4 XL 2024": "/images/Gmc/1.jpg",
      "Chevrolet Suburban 2025": "/images/camioneta-1.png",
      "BMW X7 2024": "/images/bmw/1.jpg"
    };
    return imageMap[option] || "";
  };

  if (disabled) {
    return null;
  }

  return (
    <Select 
      onValueChange={(value) => {
        onValueChange(value);
        onImageChange(getImageSource(value));
      }}
    >
      <SelectTrigger className="bg-[#fefefe] border-[#ff0054]/20 text-[#060404] text-lg">
        <SelectValue placeholder="Select a package" />
      </SelectTrigger>
      <SelectContent>
        {options.map(option => (
          <SelectItem 
            key={option} 
            value={option} 
            className="text-lg text-[#060404]"
          >
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};