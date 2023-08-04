import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { scrollMemoryAtom } from '../atoms/scroll';
import debounce from '../utils/debounce';
const regex = new RegExp(/profile\//);

export default function useScroll() {
  const reference = useRef();
  const { pathname } = useLocation();
  const [scrollMemory, setScrollMemory] = useRecoilState(scrollMemoryAtom);

  const handleSetScrollY = debounce(() => {
    if (pathname === '/feed' || pathname === '/profile' || regex.test(pathname)) {
      setScrollMemory({ ...scrollMemory, [pathname]: reference.current.scrollTop });
    }
  }, 500);

  useEffect(() => {
    const referenceValue = reference.current;
    referenceValue.addEventListener('scroll', handleSetScrollY);
    return () => {
      referenceValue.removeEventListener('scroll', handleSetScrollY);
    };
  });

  useEffect(() => {
    if (pathname === '/feed' || pathname === '/profile' || regex.test(pathname)) {
      reference.current.scrollTo(0, scrollMemory[pathname]);
    } else {
      reference.current.scrollTo(0, 0);
    }
  }, []);

  return reference;
}
