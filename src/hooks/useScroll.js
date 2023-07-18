import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { scrollMemoryAtom } from '../atoms/scroll';
import debounce from '../utils/debounce';
const regex = new RegExp(/profile\//);

export default function UseScroll({ reference }) {
  const { pathname } = useLocation();
  const [scrollMemory, setScrollMemory] = useRecoilState(scrollMemoryAtom);

  const handleSetScrollY = debounce(() => {
    if (pathname === '/feed' || pathname === '/profile' || regex.test(pathname)) {
      setScrollMemory({ ...scrollMemory, [pathname]: reference.current.scrollTop });
    }
    console.log(scrollMemory);
  }, 500);

  useEffect(() => {
    reference.current.addEventListener('scroll', handleSetScrollY);
    return () => {
      reference.current?.removeEventListener('scroll', handleSetScrollY);
    };
  });

  useEffect(() => {
    if (pathname === '/feed' || pathname === '/profile' || regex.test(pathname)) {
      reference.current.scrollTo(0, scrollMemory[pathname]);
    } else {
      reference.current.scrollTo(0, 0);
    }
  }, []);

  return null;
}
