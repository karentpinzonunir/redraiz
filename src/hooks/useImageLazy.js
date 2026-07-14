import { useEffect, useState } from "react";

const DEFAULT_PLACEHOLDER =
  "data:image/svg+xml;charset=UTF-8," +
  encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
      <rect width="800" height="600" fill="#f2f4f3"/>
      <rect x="220" y="150" width="360" height="220" rx="24" fill="#d9e2dd"/>
      <circle cx="330" cy="240" r="28" fill="#b7c7bf"/>
      <text x="400" y="470" text-anchor="middle" fill="#6c757d" font-family="Arial, sans-serif" font-size="28">
        Imagen no disponible
      </text>
    </svg>
  `);

export const useImageLazy = (src) => {
  const [imgSrc, setImgSrc] = useState(src || DEFAULT_PLACEHOLDER);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
    setImgSrc(src || DEFAULT_PLACEHOLDER);
  }, [src]);

  const handleError = () => setImgSrc(DEFAULT_PLACEHOLDER);
  const handleLoad = () => setIsLoaded(true);

  return {
    imgSrc,
    isLoaded,
    handleLoad,
    handleError,
  };
};
export default useImageLazy;