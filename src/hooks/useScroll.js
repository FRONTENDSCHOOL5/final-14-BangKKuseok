import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { scrollMemoryAtom } from '../atoms/scroll';
import debounce from '../utils/debounce';

export default function useScroll() {
  const reference = useRef();
  const { pathname } = useLocation();
  const [scrollMemory, setScrollMemory] = useRecoilState(scrollMemoryAtom);

  const handleSetScrollY = debounce(() => {
    setScrollMemory({ ...scrollMemory, [pathname]: reference.current.scrollTop });
  }, 500);

  useEffect(() => {
    const referenceValue = reference.current;
    if (referenceValue) {
      referenceValue.addEventListener('scroll', handleSetScrollY);
      return () => {
        referenceValue.removeEventListener('scroll', handleSetScrollY);
      };
    }
  });

  useEffect(() => {
    if (reference.current) {
      reference.current.scrollTo(0, scrollMemory[pathname]);
    }
  }, []);

  return reference;
}
