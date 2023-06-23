import React, { useState, useEffect } from 'react';
import { useMutation } from 'react-query';
import { Link } from 'react-router-dom';
import { checkEmailExist } from '../../../api/signupApi';
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button/Button';
import { SignUpHeader, SignUpLogo, SignUpBottomBox, SignUpGoBack } from './SignUpStyle';

const SignUp = ({ setStep, setPreData, preData }) => {
  // 이메일, 비밀번호 값을 받아옴
  const [emailValue, setEmailValue] = useState(preData.email);
  const [passwordValue, setPasswordValue] = useState(preData.password);

  // 에러메시지 설정
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // 이메일이 유효하지 않으면 true
  const [isEmailInValid, setIsEmailInValid] = useState(true);
  // 비밀번호가 유효하지 않으면 true
  const [isPasswordInValid, setIsPasswordInValid] = useState(true);

  // 버튼 활성화를 위해 만듦.
  const [btnDisabled, setBtnDisabled] = useState(false);

  const signupMutation = useMutation(checkEmailExist, {
    onSuccess: (formData) => {
      if (formData.message === '사용 가능한 이메일 입니다.') {
        setIsEmailInValid(false);
        if (!isEmailInValid && !isPasswordInValid) {
          setPreData({ email: emailValue, password: passwordValue });
          setStep('프로필설정');
        }
      } else if (formData.message === '이미 가입된 이메일 주소 입니다.') {
        setEmailError(formData.message);
        setIsEmailInValid(true);
        setBtnDisabled(true);
      }
    },
    onError: (error) => {
      console.error(error);
    },
  });

  // 이메일 입력값 받아오기
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmailError('');
    setEmailValue(value);
  };

  // 비밀번호 입력값 받아오기
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPasswordError('');
    setPasswordValue(value);
  };

  useEffect(() => {
    setBtnDisabled(false);
  }, [emailValue, passwordValue]);

  // 이메일 유효성 검사 후 에러메시지 갱신
  const handleValidateEmail = (e) => {
    if (
      !/^[A-Za-z0-9._-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i.test(emailValue) &&
      emailValue.length > 0
    ) {
      setIsEmailInValid(true);
      setEmailError('잘못된 이메일 형식입니다.');
    } else if (emailValue.length === 0) {
      setIsEmailInValid(true);
      setEmailError('이메일을 입력해주세요.');
    } else {
      setEmailError('');
      setIsEmailInValid(false);
    }
  };

  // 비밀번호 유효성 검사 후 에러메시지 갱신
  const handleValidatePassword = () => {
    if (passwordValue.length === 0) {
      setIsPasswordInValid(true);
      setPasswordError('비밀번호를 입력해주세요.');
    } else if (passwordValue.length < 6 && passwordValue.length > 0) {
      setIsPasswordInValid(true);
      setPasswordError('비밀번호는 6자 이상이어야 합니다.');
    } else {
      setPasswordError('');
      setIsPasswordInValid(false);
    }
  };

  // 버튼이 눌리면
  const handleSubmit = (e) => {
    e.preventDefault();

    handleValidateEmail();
    handleValidatePassword();

    setBtnDisabled(isEmailInValid || isPasswordInValid);
    if (!btnDisabled) {
      signupMutation.mutate({ user: { email: emailValue } });
    }
  };
  return (
    <form>
      <SignUpHeader>
        <SignUpLogo>이메일로 회원가입</SignUpLogo>

        <Input
          id='emailSignup'
          inputType='email'
          labelText='이메일'
          placeHolder='이메일을 입력하세요'
          value={emailValue}
          warningMsg={emailError}
          onChange={handleEmailChange}
          onBlur={handleValidateEmail}
          isInValid={isEmailInValid}
        />

        <Input
          id='passwordSignup'
          inputType='password'
          labelText='비밀번호'
          placeHolder='비밀번호를 입력하세요'
          value={passwordValue}
          warningMsg={passwordError}
          onChange={handlePasswordChange}
          onBlur={handleValidatePassword}
          isInValid={isPasswordInValid}
        />

        <SignUpBottomBox>
          <Button type='submit' size='lg' onClick={handleSubmit} disabled={btnDisabled}>
            다음
          </Button>
          <SignUpGoBack>
            <Link to={'/login'}>로그인</Link>
            <Link to={'/main'}>메인으로 돌아가기</Link>
          </SignUpGoBack>
        </SignUpBottomBox>
      </SignUpHeader>
    </form>
  );
};

export default SignUp;
