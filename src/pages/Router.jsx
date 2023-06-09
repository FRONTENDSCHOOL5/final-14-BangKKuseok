import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage/HomePage';
import MainPage from './MainPage/MainPage';
import LoginPage from './LoginPage/LoginPage';
import SignupPage from './SignupPage/SignupPage';
import FeedPage from './FeedPage/FeedPage';
import PostPage from './PostPage/PostPage/PostPage';
import PostUploadPage from './PostPage/PostUploadPage/PostUploadPage';
import PostEditPage from './PostPage/PostEditPage/PostEditPage';
import ProductUploadPage from './ProductPage/ProductUploadPage/ProductUploadPage';
import ProductEditPage from './ProductPage/ProductEditPage/ProductEditPage';
import ProfilePage from './ProfilePage/ProfilePage/ProfilePage';
import ProfileEditPage from './ProfilePage/ProfileEditPage/ProfileEditPage';
import FollowersPage from './ProfilePage/FollowPage/FollowersPage/FollowersPage';
import FollowingsPage from './ProfilePage/FollowPage/FollowingsPage/FollowingsPage';
import ChatRoomPage from './ChatPage/ChatRoomPage/ChatRoomPage';
import ChatListPage from './ChatPage/ChatListPage/ChatListPage';
import NotFoundPage from './404/NotFoundPage';
import PrivateRoutePage from './AuthenticatedPage/PrivateRoutePage';
import PublicRoutePage from './AuthenticatedPage/PublicRoutePage';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoutePage />}>
          <Route path='/' element={<MainPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignupPage />} />
        </Route>

        <Route element={<PrivateRoutePage />}>
          <Route path='/home' element={<HomePage />} />
          <Route path='/feed' element={<FeedPage />} />
          <Route path='/post/upload' element={<PostUploadPage />} />
          <Route path='/post/:postId' element={<PostPage />} />
          <Route path='/post/:postId/edit' element={<PostEditPage />} />
          <Route path='/product/upload' element={<ProductUploadPage />} />
          <Route path='/product/:productId/edit' element={<ProductEditPage />} />
          <Route path='/profile'>
            <Route index element={<ProfilePage />} />
            <Route path='edit' element={<ProfileEditPage />} />
            <Route path=':accountname'>
              <Route index element={<ProfilePage />} />
              <Route path='followers' element={<FollowersPage />} />
              <Route path='followings' element={<FollowingsPage />} />
            </Route>
          </Route>
          <Route path='/chat' element={<ChatListPage />} />
          <Route path='/chat/:accountname' element={<ChatRoomPage />} />
        </Route>
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
