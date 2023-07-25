import { Navigate, Outlet } from 'react-router-dom';

const PublicRoutePage = () => {
  const authenticated = localStorage.getItem('token');
  const visited = sessionStorage.getItem('hasVisited');

  // 로그인 상태에서 최초 방문시 경고창 띄우지 않도록 한다.
  if (!visited) {
    sessionStorage.setItem('hasVisited', true);
  }

  return authenticated ? (
    // 로그인 상태라면 PublicRoutePage 접근 방지
    visited ? (
      <Navigate to='/home' {...alert('로그아웃 이후 접근 가능한 페이지입니다.')} />
    ) : (
      // 최초 접근시 경고창 띄우지 않음
      <Navigate to='/home' />
    )
  ) : (
    <Outlet />
  );
};

export default PublicRoutePage;
