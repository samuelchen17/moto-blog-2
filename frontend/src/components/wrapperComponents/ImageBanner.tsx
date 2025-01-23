import React, { useState } from "react";
import { Skeleton } from "../ui/skeleton";

interface ImageBannerProps {
  img: string;
  children: React.ReactNode;
}

const ImageBanner: React.FC<ImageBannerProps> = ({ img, children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  return (
    <div className="relative w-full h-[400px] lg:h-[500px] 2xl:h-[600px]">
      {isLoading && <Skeleton className="w-full h-full" />}
      <img
        alt="image banner"
        src={img}
        className={`w-full h-full object-cover filter contrast-125 brightness-75 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
        onLoad={() => setIsLoading(false)}
      />

      <div className="absolute inset-0 bg-black opacity-10 z-0" />

      <div className="absolute inset-0 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default ImageBanner;
