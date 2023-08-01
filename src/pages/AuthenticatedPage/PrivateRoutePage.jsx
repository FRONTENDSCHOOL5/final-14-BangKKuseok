import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoutePage = () => {
  const authenticated = localStorage.getItem('token');

  return !authenticated ? (
    // 로그아웃 상태라면 PrivateRoutePage 접근 방지
    <Navigate to='/' {...alert('로그인이 필요한 서비스입니다.')} />
  ) : (
    <Outlet />
  );
};

export default PrivateRoutePage;
