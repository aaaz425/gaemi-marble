import { useCallback, useState } from 'react';

type HoverReturnType = {
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
  isHover: boolean;
};

export default function useHover(): HoverReturnType {
  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = useCallback(() => {
    setIsHover(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHover(false);
  }, []);

  return { handleMouseEnter, handleMouseLeave, isHover };
}
