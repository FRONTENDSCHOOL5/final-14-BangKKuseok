import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { postLogin } from '../../api/loginApi';
import LoginSignUp from '../../components/LoginSignUp/LoginSignUp/LoginSignUp';
import { useSetRecoilState } from 'recoil';
import { myProfileDataAtom } from '../../atoms/myProfile';

export default function LoginPage() {
  const [preData, setPreData] = useState({
    email: 'ohlee_official@bk.com',
    password: '123123',
  });
  const [message, setMessage] = useState('');
  const setMyProfile = useSetRecoilState(myProfileDataAtom);

  const navigate = useNavigate();

  const loginMutation = useMutation(postLogin, {
    onSuccess: (formData) => {
      if (formData.message === '이메일 또는 비밀번호가 일치하지 않습니다.') {
        setMessage(formData.message);
      } else {
        // 성공
        localStorage.setItem('token', formData.user.token);
        localStorage.setItem('myProfileData', JSON.stringify(formData.user));
        setMyProfile(formData.user);
        navigate('/home');
      }
    },
    onError: (formData) => {
      console.error(formData.message);
    },
  });

  const handleNextLink = () => {
    loginMutation.mutate({ user: { email: preData.email, password: preData.password } });
  };

  useEffect(() => {
    setMessage('');
  }, [preData.email, preData.password]);

  return (
    <>
      <LoginSignUp
        logo='로그인'
        type='login'
        setPreData={setPreData}
        preData={preData}
        message={message}
        onClickNextLink={handleNextLink}
      />
    </>
  );
}
