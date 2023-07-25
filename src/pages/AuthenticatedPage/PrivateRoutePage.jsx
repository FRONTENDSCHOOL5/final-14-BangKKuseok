import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoutePage = () => {
  const authenticated = localStorage.getItem('token');

  return !authenticated ? (
    // 로그아웃 상태라면 PrivateRoutePage 접근 방지
    <Navigate to='/' {...alert('로그인 이후 접근 가능한 페이지입니다.')} />
  ) : (
    <Outlet />
  );
};

export default PrivateRoutePage;
