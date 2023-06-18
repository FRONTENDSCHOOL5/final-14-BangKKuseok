import React from 'react';
import WhiteLogo from '../../../assets/images/logo-white.png';
import SocialButton from '../../common/Button/SocialButton/SocialButton';
import { MainPageWrapper, WhiteLogoImg, BottomBox, BtnBox, AccountSignUpBox } from './MainStyle';

export default function Main({ gotoLogin, gotoSignUp }) {
  const handleGotoLogin = () => {
    gotoLogin();
  };

  const handleGotoSignUp = () => {
    gotoSignUp();
  };

  return (
    <MainPageWrapper>
      <WhiteLogoImg src={WhiteLogo} />
      <BottomBox>
        <BtnBox>
          <SocialButton social='mail' onClick={handleGotoLogin}>
            이메일로 로그인
          </SocialButton>
          <SocialButton social='kakao'>카카오톡 계정으로 로그인</SocialButton>
          <SocialButton social='google'>구글 계정으로 로그인</SocialButton>
          <AccountSignUpBox>
            <a>계정찾기</a>
            <a onClick={handleGotoSignUp}>회원가입</a>
          </AccountSignUpBox>
        </BtnBox>
      </BottomBox>
    </MainPageWrapper>
  );
}
