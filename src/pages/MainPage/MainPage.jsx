import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Main from '../../components/LoginSignUp/Main/Main';
import Splash from '../SplashPage/Splash';

export default function MainPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState('splash');

  useEffect(() => {
    const timer = setTimeout(() => setStep('main'), 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleLoginLink = () => {
    navigate('/login');
  };

  return (
    <>
      {step === 'splash' && <Splash />}
      {step === 'main' && <Main onClickLoginLink={handleLoginLink} />}
    </>
  );
}
