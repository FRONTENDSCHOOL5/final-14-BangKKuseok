import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignUp from '../../components/LoginSignUp/SignUp/SignUp';
import SetUserProfile from '../../components/LoginSignUp/SetUserProfile/SetUserProfile';
import { useMutation } from 'react-query';
import { checkIdExist, postSignUp } from '../../api/signupApi';
import Welcome from '../../components/LoginSignUp/Welcome/Welcome';

export default function SignupPage() {
  const [isAlreadyIdMsg, setIsAlreadyIdMsg] = useState('');
  const [step, setStep] = useState('회원가입');
  const [preData, setPreData] = useState({
    email: '',
    password: '',
    username: 'usernameTest',
    accountname: 'accountnameTest',
    intro: '',
    image: '',
  });

  const navigate = useNavigate();

  const profileMutation = useMutation(postSignUp, {
    onSuccess: (formData) => {
      if (formData.message === '회원가입 성공') {
        setStep('환영합니다');
      }
    },
    onError: (formData) => {
      console.log(formData.message);
    },
  });

  const idMutation = useMutation(checkIdExist, {
    onSuccess: (formData) => {
      if (formData.message === '사용 가능한 계정ID 입니다.') {
        profileMutation.mutate({
          user: {
            email: preData.email,
            password: preData.password,
            username: preData.username,
            accountname: preData.accountname,
            intro: preData.intro,
            image: preData.image,
          },
        });
      } else if (formData.message === '이미 가입된 계정ID 입니다.') {
        setIsAlreadyIdMsg(formData.message);
      } else {
        console.log(formData.message);
      }
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleBackLink = () => {
    if (step === '프로필설정') {
      setStep('회원가입');
      navigate('/signup');
    }
  };

  const handleNextLink = () => {
    if (step === '프로필설정') {
      idMutation.mutate({ user: { accountname: preData.accountname } });
    }
  };

  useEffect(() => {
    setIsAlreadyIdMsg('');
  }, [preData.accountname]);

  return (
    <>
      {step === '회원가입' && (
        <SignUp setStep={setStep} setPreData={setPreData} preData={preData} />
      )}
      {step === '프로필설정' && (
        <SetUserProfile
          onClickBackLink={handleBackLink}
          onClickNextLink={handleNextLink}
          setStep={setStep}
          setData={setPreData}
          preEmail={preData.email}
          prePassword={preData.password}
          message={isAlreadyIdMsg}
        />
      )}
      {step === '환영합니다' && <Welcome />}
    </>
  );
}
