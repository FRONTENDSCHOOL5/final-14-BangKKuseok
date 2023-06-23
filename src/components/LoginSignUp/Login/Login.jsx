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
  const [isEmailInValid, setIsEmailInValid] = useState(false);
  // 비밀번호가 유효하지 않으면 true
  const [isPwInValid, setIsPwInValid] = useState(false);

  // 버튼 활성화를 위해 만듦. 사용자가 입력하는 동안은 버튼 활성화가 되지만, 버튼을 눌렀을 때 이메일 혹은 비밀번호가 유효하지 않으면 값을 true로 바꿔줌으로써 버튼을 disabled 시킴
  const [isInValid, setIsInValid] = useState(true);

  const navigate = useNavigate();

  const loginMutation = useMutation(postLogin, {
    onSuccess: (formData) => {
      if (formData.message) {
        setPasswordError(formData.message);
        setIsInValid(true);
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
  };

  // 비밀번호 입력값 받아오기
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPasswordValue(value);
  };

  // 이메일 입력값이 바뀔때마다
  useEffect(() => {
    setEmailError('');
    // 버튼 활성화를 위해 IsInvalid를 false로
    setIsInValid(false);
    // @문자가 포함되어있지 않거나, @뒤에 글자가 입력되지 않았을 때
    if (!emailValue.includes('@') || emailValue.split('@')[1].length === 0) {
      setIsEmailInValid(true);
    } else {
      setIsEmailInValid(false);
    }
  }, [emailValue]);

  // 비밀번호 입력값이 바뀔때마다
  useEffect(() => {
    setPasswordError('');
    // 버튼 활성화를 위해 IsInvalid를 false로
    setIsInValid(false);
    // 비밀번호 길이가 6보다 작다면
    if (passwordValue.length < 6) {
      setIsPwInValid(true);
    } else {
      setIsPwInValid(false);
    }
  }, [passwordValue]);

  // 이메일 유효성 검사 후 에러메시지 갱신
  const handleValidateEmail = () => {
    if (isEmailInValid) {
      if (emailValue === '') {
        setEmailError('이메일을 입력해주세요.');
      } else {
        setEmailError('잘못된 이메일 형식입니다.');
      }
      setIsEmailInValid(true);
    } else {
      setEmailError('');
      setIsEmailInValid(false);
    }
  };

  // 비밀번호 유효성 검사 후 에러메시지 갱신
  const handleValidatePassword = () => {
    if (isPwInValid) {
      if (passwordValue === '') {
        setPasswordError('비밀번호를 입력해주세요.');
      } else {
        setPasswordError('비밀번호는 6자 이상이어야 합니다.');
      }
      setIsPwInValid(true);
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
    setIsInValid(isEmailInValid || isPwInValid);

    // 이메일, 비밀번호 유효성 통과하면 Home으로 이동
    if (!isEmailInValid && !isPwInValid) {
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
          disabled={emailValue === '' || passwordValue === '' || isInValid}
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
