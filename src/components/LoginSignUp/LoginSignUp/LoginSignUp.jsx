import { useState, useEffect, React } from 'react';
import { Link } from 'react-router-dom';
import { LoginSignUpWrapper, LoginSignUpLogo, BottomBox, LinkWrapper } from './LoginSignUpStyle';
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button/Button';
import useUserForm from '../../../hooks/useUserForm';

export default function LoginSignUp({ logo, type, setPreData, preData, message, onClickNextLink }) {
  // 이메일, 비밀번호 값을 받아옴
  const [formData, isValidFormData, errorMessage, handleSetErrorMessage, handleChange] =
    useUserForm(preData);

  // 버튼 활성화를 위해 만듦.
  const [isBtnDisabled, setIsBtnDisalbed] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (type === 'login') {
      handleSetErrorMessage();
    }

    if (!isBtnDisabled) {
      onClickNextLink();
      setIsBtnDisalbed(message || isValidFormData.email || isValidFormData.password);
    }
  };

  useEffect(() => {
    setPreData((prev) => ({ ...prev, email: formData.email, password: formData.password }));

    if (!formData.email || !formData.password) {
      setIsBtnDisalbed(true);
    } else {
      setIsBtnDisalbed(false);
    }
  }, [formData, setPreData]);

  return (
    <LoginSignUpWrapper>
      <LoginSignUpLogo>{logo}</LoginSignUpLogo>
      <Input
        id='emailSignup'
        inputType='email'
        labelText='이메일'
        placeHolder='이메일을 입력하세요'
        value={formData.email}
        warningMsg={(type === 'signup' && message) || errorMessage.email}
        onChange={handleChange}
        // signup일때만 onBlur시에 바로 유효성 검사
        onBlur={() => type === 'signup' && handleSetErrorMessage()}
        isInValid={isValidFormData.email}
      />

      <Input
        id='passwordSignup'
        inputType='password'
        labelText='비밀번호'
        placeHolder='비밀번호를 입력하세요'
        value={formData.password}
        warningMsg={(type === 'login' && message) || errorMessage.password}
        onChange={handleChange}
        // signup일때만 onBlur시에 바로 유효성 검사
        onBlur={() => type === 'signup' && handleSetErrorMessage()}
        isInValid={isValidFormData.password}
      />
      <BottomBox>
        <Button type='submit' size='lg' onClick={handleSubmit} disabled={isBtnDisabled}>
          다음
        </Button>
        <LinkWrapper>
          {type === 'signup' ? (
            <Link to={'/login'}>로그인</Link>
          ) : (
            <Link to={'/signup'}>회원가입</Link>
          )}
          <Link to={'/'}>메인으로 돌아가기</Link>
        </LinkWrapper>
      </BottomBox>
    </LoginSignUpWrapper>
  );
}
