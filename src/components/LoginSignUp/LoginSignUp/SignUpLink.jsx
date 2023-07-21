import React from 'react';
import { Link } from 'react-router-dom';

const SignUpLink = () => {
  return (
    <>
      <Link to={'/login'}>로그인</Link>
      <Link to={'/'}>메인으로 돌아가기</Link>
    </>
  );
};

export default SignUpLink;
