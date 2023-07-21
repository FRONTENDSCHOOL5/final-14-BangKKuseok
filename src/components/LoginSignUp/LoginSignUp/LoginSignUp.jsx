import { useState, useEffect, React } from 'react';
import { LoginSignUpWrapper, LoginSignUpLogo, BottomBox, LinkWrapper } from './LoginSignUpStyle';
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button/Button';
import SignUpLink from './SignUpLink';
import LoginLink from './LoginLink';

export default function LoginSignUp({ logo, type, setPreData, preData, message, onClickNextLink }) {
  // 이메일, 비밀번호 값을 받아옴
  const [emailValue, setEmailValue] = useState(preData.email ?? '');
  const [passwordValue, setPasswordValue] = useState(preData.password ?? '');

  // 에러메시지 설정
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // 이메일이 유효하지 않으면 true
  const [isEmailInValid, setIsEmailInValid] = useState(true);
  // 비밀번호가 유효하지 않으면 true
  const [isPasswordInValid, setIsPasswordInValid] = useState(true);

  // 버튼 활성화를 위해 만듦.
  const [btnDisabled, setBtnDisabled] = useState(true);

  // 회원가입에서 이메일 중복 유효성 체크 실패시 email입력칸 아래에 에러메시지
  // 로그인에서 로그인 실패시 password입력칸 아래에 에러메시지
  useEffect(() => {
    if (type === 'signup') {
      setEmailError(message);
      setIsEmailInValid(true);
    } else if (type === 'login') {
      setPasswordError(message);
      setIsPasswordInValid(true);
    }
    setBtnDisabled(true);
  }, [message]);

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

  // 이메일 유효성 검사 후 에러메시지 갱신
  const handleValidateEmail = (e) => {
    if (
      !/^[A-Za-z0-9._-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i.test(emailValue) &&
      emailValue.length > 0
    ) {
      setBtnDisabled(true);
      setIsEmailInValid(true);
      setEmailError('잘못된 이메일 형식입니다.');
    } else if (emailValue.length === 0) {
      setBtnDisabled(true);
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
      setBtnDisabled(true);
      setIsPasswordInValid(true);
      setPasswordError('비밀번호를 입력해주세요.');
    } else if (passwordValue.length < 6 && passwordValue.length > 0) {
      setBtnDisabled(true);
      setIsPasswordInValid(true);
      setPasswordError('비밀번호는 6자 이상이어야 합니다.');
    } else {
      setPasswordError('');
      setIsPasswordInValid(false);
    }
  };

  useEffect(() => {
    setPreData({
      email: emailValue,
      password: passwordValue,
    });
    if (type === 'signup') {
      if (emailValue.length > 0 || passwordValue.length > 0) {
        setBtnDisabled(false);
      }
    } else if (type === 'login') {
      if (emailValue.length > 0 && passwordValue.length > 0) {
        setBtnDisabled(false);
      } else {
        setBtnDisabled(true);
      }
    }
  }, [emailValue, passwordValue]);

  // 버튼이 눌리면
  const handleSubmit = (e) => {
    e.preventDefault();

    handleValidateEmail();
    handleValidatePassword();

    // 이메일, 비밀번호 둘 중 유효하지 않은 값이 있다면 isInValid가 true
    setBtnDisabled(isEmailInValid || isPasswordInValid);

    if (!btnDisabled) {
      onClickNextLink();
    }
  };

  return (
    <LoginSignUpWrapper>
      <LoginSignUpLogo>{logo}</LoginSignUpLogo>
      <Input
        id='emailSignup'
        inputType='email'
        labelText='이메일'
        placeHolder='이메일을 입력하세요'
        value={emailValue}
        warningMsg={emailError}
        onChange={handleEmailChange}
        // signup일때만 onBlur시에 바로 유효성 검사
        onBlur={() => type === 'signup' && handleValidateEmail()}
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
        // signup일때만 onBlur시에 바로 유효성 검사
        onBlur={() => type === 'signup' && handleValidatePassword()}
        isInValid={isPasswordInValid}
      />
      <BottomBox>
        <Button type='submit' size='lg' onClick={handleSubmit} disabled={btnDisabled}>
          다음
        </Button>
        <LinkWrapper>{type === 'signup' ? <SignUpLink /> : <LoginLink />}</LinkWrapper>
      </BottomBox>
    </LoginSignUpWrapper>
  );
}
