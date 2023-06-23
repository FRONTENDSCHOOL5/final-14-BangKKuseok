import React, { useEffect } from 'react';
import logoImg from '../../assets/images/logo-large.png';
import furnituresImg from '../../assets/images/furnitures.png';
import { useNavigate } from 'react-router-dom';
import { RailImg, SplashPageWrapper, StyledLogo } from './SplashPageStyle';

export default function SplashPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate('/main'), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <SplashPageWrapper>
      <StyledLogo src={logoImg} alt='로고' />
      <ul>
        <RailImg furnituresImg={furnituresImg} />
        <RailImg furnituresImg={furnituresImg} />
      </ul>
      <div></div>
    </SplashPageWrapper>
  );
}
