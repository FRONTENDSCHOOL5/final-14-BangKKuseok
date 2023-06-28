import React from 'react';
import logoImg from '../../assets/images/logo-large.png';
import furnituresImg from '../../assets/images/furnitures.png';
import { RailImg, SplashPageWrapper, StyledLogo } from './SplashStyle';

export default function Splash() {
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
