import React from 'react';
import { Link } from 'react-router-dom';

const LoginLink = () => {
  return (
    <>
      <Link to={'/signup'}>회원가입</Link>
      <Link to={'/'}>메인으로 돌아가기</Link>
    </>
  );
};

export default LoginLink;
