import React, { useCallback, useEffect, useRef } from 'react';

export default function useObserver(hasNextPage, fetchNextPage, isLoading) {
  //스크롤 감지를 위한 IntersectionObserver API
  const observerRef = useRef();

  const handleObserver = useCallback(
    (entries) => {
      const [target] = entries;
      if (target.isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage],
  );

  useEffect(() => {
    const element = observerRef.current;
    const option = { threshold: 0 };
    const observer = new IntersectionObserver(handleObserver, option);
    if (element) {
      observer.observe(element);
      return () => observer.unobserve(element);
    }
  }, [fetchNextPage, handleObserver, isLoading]);

  return observerRef;
}
