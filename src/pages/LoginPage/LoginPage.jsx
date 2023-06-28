import React from 'react';
import Login from '../../components/LoginSignUp/Login/Login';
import styled from 'styled-components';

const LoginPageWrapper = styled.section`
  box-shadow: rgba(105, 80, 80, 0.08) 0px -3px 20px;
  width: clamp(390px, 100%, 720px);
  margin: 0 auto;
`;

export default function LoginPage() {
  return (
    <LoginPageWrapper>
      <Login />
    </LoginPageWrapper>
  );
}
