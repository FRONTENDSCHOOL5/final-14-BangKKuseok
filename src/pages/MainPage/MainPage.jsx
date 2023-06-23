import React from 'react';
import { useNavigate } from 'react-router-dom';
import Main from '../../components/LoginSignUp/Main/Main';

export default function MainPage() {
  const navigate = useNavigate();

  const handleLoginLink = () => {
    navigate('/login');
  };

  return <Main onClickLoginLink={handleLoginLink} />;
}
