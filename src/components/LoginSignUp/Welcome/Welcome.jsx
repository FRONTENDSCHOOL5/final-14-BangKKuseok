import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import drawerImg from '../../../assets/images/drawer-img.png';
import confettiLotti from '../../../assets/lottie/confetti.json';
import Button from '../../common/Button/Button/Button';
import { Link } from 'react-router-dom';
import { Confetti, Headerh2, WelcomeWrapper } from './WelcomeStyle';

export default function Welcome() {
  const confettiRef = useRef();
  useEffect(() => {
    lottie.loadAnimation({
      container: confettiRef.current,
      renderer: 'svg',
      loop: false,
      autoplay: true,
      animationData: confettiLotti,
    });
  }, []);

  return (
    <WelcomeWrapper>
      {drawerImg && (
        <div>
          <Confetti ref={confettiRef} />
          <img src={drawerImg} alt='서랍 이미지' />
        </div>
      )}
      <Headerh2>
        환영합니다!
        <br />
        이제 방꾸석에 들어가볼까요?
      </Headerh2>
      <Link to={'/login'}>
        <Button size={'md'}>로그인하기</Button>
      </Link>
    </WelcomeWrapper>
  );
}
