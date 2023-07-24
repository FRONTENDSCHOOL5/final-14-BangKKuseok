import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Furniture from './Furniture/Furniture';
import WhiteLogo from '../../../assets/images/logo-white.png';
import SocialButton from '../../common/Button/SocialButton/SocialButton';
import spotLightImg from '../../../assets/images/spotlight.png';
import rotateImg from '../../../assets/images/rotate-icon.png';
import {
  MainPageWrapper,
  WhiteLogoImg,
  BtnBox,
  AccountSignUpBox,
  CanvasBox,
  BottomSection,
} from './MainStyle';

export default function Main({ onClickLoginLink }) {
  const [isRotate, setIsRotate] = useState(true);

  const handleGotoLogin = () => {
    onClickLoginLink();
  };

  return (
    <MainPageWrapper>
      <WhiteLogoImg src={WhiteLogo} />
      <CanvasBox spotLightImg={spotLightImg} rotateImg={rotateImg} isRotate={isRotate}>
        <div>
          <Furniture setIsRotate={setIsRotate} />
        </div>
      </CanvasBox>
      <BottomSection>
        <BtnBox>
          <SocialButton social='mail' onClick={handleGotoLogin}>
            이메일로 로그인
          </SocialButton>
          <SocialButton social='kakao'>카카오톡 계정으로 로그인</SocialButton>
          <SocialButton social='google'>구글 계정으로 로그인</SocialButton>
          <AccountSignUpBox>
            <Link to={''}>계정 찾기</Link>
            <Link to={'/signup'}>회원가입</Link>
          </AccountSignUpBox>
        </BtnBox>
      </BottomSection>
    </MainPageWrapper>
  );
}
