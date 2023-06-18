import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignUp from '../../components/LoginSignUp/SignUp/SignUp';
import SetUserProfile from '../../components/LoginSignUp/SetUserProfile/SetUserProfile';

export default function SignupPage() {
  const [step, setStep] = useState('회원가입');

  const navigate = useNavigate();

  const handleBackLink = () => {
    if (step === '회원가입') {
      setStep('로그인');
      navigate('/login');
    } else if (step === '프로필설정') {
      setStep('회원가입');
      navigate('/signup');
    }
  };

  const handleMainLink = () => {
    setStep('메인');
    navigate('/main');
  };

  const handleNextLink = () => {
    if (step === '회원가입') {
      setStep('프로필설정');
    } else if (step === '프로필설정') {
      setStep('홈');
      navigate('/');
    }
  };

  return (
    <>
      {step === '회원가입' && (
        <SignUp
          handleBackLink={handleBackLink}
          handleMainLink={handleMainLink}
          handleNextLink={handleNextLink}
        />
      )}
      {step === '프로필설정' && (
        <SetUserProfile handleBackLink={handleBackLink} handleNextLink={handleNextLink} />
      )}
    </>
  );
}
