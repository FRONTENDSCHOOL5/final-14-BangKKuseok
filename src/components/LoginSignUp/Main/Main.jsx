import React from 'react';
import { Link } from 'react-router-dom';
import WhiteLogo from '../../../assets/images/logo-white.png';
import SocialButton from '../../common/Button/SocialButton/SocialButton';
import spotLightImg from '../../../assets/images/spotlight.png';
import {
  MainPageWrapper,
  WhiteLogoImg,
  BtnBox,
  AccountSignUpBox,
  CanvasBox,
  BottomSection,
  BackgroundImg,
} from './MainStyle';
import Furniture from './Furniture/Furniture';

export default function Main({ onClickLoginLink }) {
  const handleGotoLogin = () => {
    onClickLoginLink();
  };

  return (
    <MainPageWrapper>
      <WhiteLogoImg src={WhiteLogo} />
      <CanvasBox>
        <Furniture />
      </CanvasBox>
      <BackgroundImg src={spotLightImg} alt='배경 조명 이미지' />
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
