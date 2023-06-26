import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { postLogin } from '../../../api/loginApi';
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button/Button';
import { LoginHeader, LoginLogo, LoginBottomBox, LoginGoBack } from './LoginStyle';

const Login = () => {
  // 이메일의 값을 받아옴
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  // 비밀번호의 값을 받아옴
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // 이메일이 유효하지 않으면 true
  const [isEmailInValid, setIsEmailInValid] = useState(true);
  // 비밀번호가 유효하지 않으면 true
  const [isPwInValid, setIsPwInValid] = useState(true);

  // 버튼 활성화를 위해 만듦.
  const [btnDisabled, setBtnDisabled] = useState(true);

  const navigate = useNavigate();

  const loginMutation = useMutation(postLogin, {
    onSuccess: (formData) => {
      if (formData.message === '이메일 또는 비밀번호가 일치하지 않습니다.') {
        // 비밀번호쪽에 에러메시지를 띄우기 위함
        setPasswordError(formData.message);
        setIsPwInValid(true);
        setBtnDisabled(true);
      } else {
        // 성공
        localStorage.setItem('token', formData.user.token);
        navigate('/');
      }
    },
    onError: (formData) => {
      console.error(formData.message);
    },
  });

  // 이메일 입력값 받아오기
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmailValue(value);
    setEmailError('');
  };

  // 비밀번호 입력값 받아오기
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPasswordValue(value);
    setPasswordError('');
  };

  // 이메일과 비밀번호에 값이 있으면 버튼 활성화
  useEffect(() => {
    if (emailValue.length > 0 && passwordValue.length > 0) {
      setBtnDisabled(false);
    }
  }, [emailValue, passwordValue]);

  // 이메일 또는 비밀번호 onfocus일 경우, 이메일 또는 비밀번호가 빈칸이라면 에러메시지 출력
  const checkIsBlank = () => {
    if (emailValue.length === 0) {
      setEmailError('이메일을 입력해주세요.');
    } else if (passwordValue.length === 0) {
      setPasswordError('비밀번호를 입력해주세요.');
    } else {
      setEmailError('');
      setPasswordError('');
    }
  };

  // 이메일 유효성 검사 후 에러메시지 갱신
  const handleValidateEmail = () => {
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
      setIsPwInValid(true);
      setPasswordError('비밀번호를 입력해주세요.');
    } else {
      setPasswordError('');
      setIsPwInValid(false);
    }
  };

  // 버튼이 눌리면
  const handleSubmit = (e) => {
    e.preventDefault();

    handleValidateEmail();
    handleValidatePassword();

    // 이메일, 비밀번호 둘 중 유효하지 않은 값이 있다면 isInValid가 true
    setBtnDisabled(isEmailInValid || isPwInValid);

    // 이메일, 비밀번호 유효성 통과하면 Home으로 이동
    if (!btnDisabled) {
      loginMutation.mutate({ user: { email: emailValue, password: passwordValue } });
    }
  };

  return (
    <LoginHeader>
      <LoginLogo>로그인</LoginLogo>

      <Input
        id='email'
        inputType='email'
        labelText='이메일'
        placeHolder='이메일을 입력하세요'
        onBlur={checkIsBlank}
        value={emailValue}
        warningMsg={emailError}
        onChange={handleEmailChange}
        isInValid={isEmailInValid}
      />

      <Input
        id='password'
        inputType='password'
        labelText='비밀번호'
        placeHolder='비밀번호를 입력하세요'
        onBlur={checkIsBlank}
        value={passwordValue}
        warningMsg={passwordError}
        onChange={handlePasswordChange}
        isInValid={isPwInValid}
      />

      <LoginBottomBox>
        <Button
          type='submit'
          size='lg'
          onClick={handleSubmit}
          // 이메일 혹은 비번이 입력되지 않았거나, 이메일 혹은 비번이 유효하지 않을 때 disabled
          disabled={btnDisabled}
        >
          로그인
        </Button>
        <LoginGoBack>
          <Link to={'/signup'}>회원가입</Link>
          <Link to={'/main'}>메인으로 돌아가기</Link>
        </LoginGoBack>
      </LoginBottomBox>
    </LoginHeader>
  );
};

export default Login;
