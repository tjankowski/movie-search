import { useCallback, useEffect } from "react";

export default function useIntersectionObserver(scrollRef, callback) {
  const createObserver = useCallback(() => {
    return new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.intersectionRatio > 0) {
          callback(en);
        }
      });
    });
  }, [callback]);

  useEffect(() => {
    if (scrollRef.current) {
      const observer = createObserver();
      const element = scrollRef.current;
      observer.observe(element);
      return () => observer.unobserve(element);
    }
  }, [createObserver, scrollRef.current]);
}
