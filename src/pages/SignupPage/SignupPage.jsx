import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { checkEmailExist } from '../../api/signupApi';
import { checkIdExist, postSignUp } from '../../api/signupApi';
import Welcome from '../../components/LoginSignUp/Welcome/Welcome';
import DefaultProfileImg from '../../assets/images/profile.png';
import LoginSignUp from '../../components/LoginSignUp/LoginSignUp/LoginSignUp';
import SetUserProfile from '../../components/LoginSignUp/SetUserProfile/SetUserProfile';

export default function SignupPage() {
  const [errorMsg, setErrorMsg] = useState('');
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

  // 프로필설정 검사 후 회원가입 여부 확인
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

  // id 중복 검사
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
            image: preData.image === '' ? DefaultProfileImg : preData.image,
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

  // 이메일 중복 검사
  const emailMutation = useMutation(checkEmailExist, {
    onSuccess: (formData) => {
      if (formData.message === '사용 가능한 이메일 입니다.') {
        if (preData.password) {
          setPreData({ email: preData.email, password: preData.password });
          setStep('프로필설정');
        }
      } else if (formData.message === '이미 가입된 이메일 주소 입니다.') {
        setErrorMsg(formData.message);
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
      idMutation.mutate({ user: { accountname: preData.accountname.toLowerCase() } });
    } else if (step === '회원가입') {
      console.log(preData.email, preData.password);
      emailMutation.mutate({ user: { email: preData.email } });
    }
  };

  useEffect(() => {
    setErrorMsg('');
  }, [preData.email]);

  useEffect(() => {
    setIsAlreadyIdMsg('');
  }, [preData.accountname]);

  return (
    <>
      {step === '회원가입' && (
        <LoginSignUp
          logo='이메일로 회원가입'
          type='signup'
          setPreData={setPreData}
          preData={preData}
          message={errorMsg}
          onClickNextLink={handleNextLink}
        />
      )}
      {step === '프로필설정' && (
        <SetUserProfile
          onClickBackLink={handleBackLink}
          onClickNextLink={handleNextLink}
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
