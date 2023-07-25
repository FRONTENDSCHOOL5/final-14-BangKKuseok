import { Navigate, Outlet } from 'react-router-dom';

const PublicRoutePage = () => {
  const authenticated = localStorage.getItem('token');

  return authenticated ? (
    // 로그인 상태라면 PublicRoutePage 접근 방지
    <Navigate to='/home' />
  ) : (
    <Outlet />
  );
};

export default PublicRoutePage;
