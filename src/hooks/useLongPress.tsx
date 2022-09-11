import { useEffect, useState, useRef } from 'react';

export default function useLongPress({
  debounceTime = 150,
  onClick
}: {
  debounceTime?: number;
  onClick: () => void;
}) {
  const intervalRef = useRef(null);
  const [isHoldingButton, setHoldingButton] = useState(false);

  useEffect(() => {
    return () => handleMouseUp();
  }, []);

  const handleMouseDown = () => {
    if (isHoldingButton) return;
    setHoldingButton(true);
    intervalRef.current = setInterval(() => {
      onClick();
    }, debounceTime);
  };

  const handleMouseUp = () => {
    setHoldingButton(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  return {
    handleMouseDown,
    handleMouseUp
  };
}
