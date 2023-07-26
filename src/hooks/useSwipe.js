import { useRef, useState } from 'react';

export default function useSwipe() {
  const scrollRef = useRef(null);
  const [isStart, setIsStart] = useState(false);
  const [isDrag, setIsDrag] = useState(false);
  const [startX, setStartX] = useState(0);

  const onDragStart = (e) => {
    e.preventDefault();
    setIsDrag(false);
    setIsStart(true);
    setStartX(e.pageX + scrollRef.current.scrollLeft);
  };

  const onDragMove = (e) => {
    if (isStart) {
      setIsDrag(true);
      scrollRef.current.scrollLeft = startX - e.pageX;
    }
  };

  const onDragEnd = () => {
    setIsStart(false);
  };

  return [isDrag, scrollRef, onDragStart, onDragMove, onDragEnd];
}
