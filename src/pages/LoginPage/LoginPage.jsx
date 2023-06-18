import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from '../../components/LoginSignUp/Login/Login';

export default function LoginPage() {
  const [step, setStep] = useState('');

  const navigate = useNavigate();

  const handleSignUpLink = () => {
    setStep('회원가입');
    navigate('/signup');
  };

  const handleMainLink = () => {
    setStep('메인');
    navigate('/main');
  };

  const handleNextLink = () => {
    setStep('홈');
    navigate('/');
  };

  return (
    <>
      <Login
        handleSignUpLink={handleSignUpLink}
        handleMainLink={handleMainLink}
        handleNextLink={handleNextLink}
      />
    </>
  );
}
