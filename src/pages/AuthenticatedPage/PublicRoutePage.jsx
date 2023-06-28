import { Navigate, Outlet } from 'react-router-dom';

const PublicRoutePage = () => {
  const authenticated = localStorage.getItem('token');

  return authenticated ? (
    <Navigate {...window.alert('잘못된 접근입니다. 로그아웃 후 시도해 주세요.')} to='/home' />
  ) : (
    <Outlet />
  );
};

export default PublicRoutePage;
