import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from '../../components/LoginSignUp/Login/Login';

export default function LoginPage() {
  const [step, setStep] = useState('');

  const navigate = useNavigate();

  const handleNextLink = () => {
    setStep('홈');
    navigate('/');
  };

  return (
    <>
      <Login onClickNextLink={handleNextLink} />
    </>
  );
}
