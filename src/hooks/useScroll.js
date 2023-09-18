import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { scrollMemoryAtom } from '../atoms/scroll';
import debounce from '../utils/debounce';
import { isClickProductTagBeforeAtom } from '../atoms/post';
const regex = new RegExp(/profile\//);

export default function useScroll() {
  const reference = useRef();
  const { pathname } = useLocation();
  const [scrollMemory, setScrollMemory] = useRecoilState(scrollMemoryAtom);
  const [isClickProductTagBefore, setIsClickProductTagBefore] = useRecoilState(
    isClickProductTagBeforeAtom,
  );

  const handleSetScrollY = debounce(() => {
    setScrollMemory({
      ...scrollMemory,
      [pathname]: reference.current ? reference.current.scrollTop : undefined,
    });
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
      if (isClickProductTagBefore && regex.test(pathname)) {
        reference.current.scrollTo(0, 0);
        setIsClickProductTagBefore(false);
      } else {
        reference.current.scrollTo(0, scrollMemory[pathname]);
      }
    }
  }, []);

  return reference;
}
