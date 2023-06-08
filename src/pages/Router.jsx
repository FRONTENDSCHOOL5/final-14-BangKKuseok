import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import SplashPage from './SplashPage/SplashPage';
import HomePage from './HomePage/HomePage';
import LoginPage from './LoginPage/LoginPage';
import SignupPage from './SignupPage/SignupPage';
import FeedPage from './FeedPage/FeedPage';
import SearchPage from './SearchPage/SearchPage';
import PostPage from './PostPage/PostPage';
import MyProfilePage from './ProfilePage/MyProfilePage/MyProfilePage';
import UserProfilePage from './ProfilePage/UserProfilePage/UserProfilePage';
import ProfileEditPage from './ProfilePage/ProfileEditPage/ProfileEditPage';
import FollowersPage from './ProfilePage/FollowPage/FollowersPage/FollowersPage';
import FollowingsPage from './ProfilePage/FollowPage/FollowingsPage/FollowingsPage';
import ChatPage from './ChatPage/ChatRoomPage/ChatRoomPage';
import ChatListPage from './ChatPage/ChatListPage/ChatListPage';
import NotFoundPage from './404/NotFoundPage';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/splash' element={<SplashPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/feed' element={<FeedPage />} />
        <Route path='/search' element={<SearchPage />} />
        <Route path='/post/:postId' element={<PostPage />} />
        <Route path='/profile'>
          <Route index element={<MyProfilePage />} />
          <Route path='edit' element={<ProfileEditPage />} />
          <Route path=':accountname'>
            <Route index element={<UserProfilePage />} />
            <Route path='follower' element={<FollowersPage />} />
            <Route path='following' element={<FollowingsPage />} />
          </Route>
        </Route>
        <Route path='/chat' element={<ChatListPage />} />
        <Route path='/chat/:accountname' element={<ChatPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
