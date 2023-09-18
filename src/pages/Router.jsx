import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Spinner from '../components/common/Spinner/Spinner';

const HomePage = lazy(() => import('./HomePage/HomePage'));
const MainPage = lazy(() => import('./MainPage/MainPage'));
const LoginPage = lazy(() => import('./LoginPage/LoginPage'));
const SignupPage = lazy(() => import('./SignupPage/SignupPage'));
const FeedPage = lazy(() => import('./FeedPage/FeedPage'));
const PostPage = lazy(() => import('./PostPage/PostPage/PostPage'));
const PostUploadPage = lazy(() => import('./PostPage/PostUploadPage/PostUploadPage'));
const PostEditPage = lazy(() => import('./PostPage/PostEditPage/PostEditPage'));
const ProductUploadPage = lazy(() => import('./ProductPage/ProductUploadPage/ProductUploadPage'));
const ProductEditPage = lazy(() => import('./ProductPage/ProductEditPage/ProductEditPage'));
const ProfilePage = lazy(() => import('./ProfilePage/ProfilePage/ProfilePage'));
const ProfileEditPage = lazy(() => import('./ProfilePage/ProfileEditPage/ProfileEditPage'));
const FollowersPage = lazy(() => import('./ProfilePage/FollowPage/FollowersPage/FollowersPage'));
const FollowingsPage = lazy(() => import('./ProfilePage/FollowPage/FollowingsPage/FollowingsPage'));
const ChatRoomPage = lazy(() => import('./ChatPage/ChatRoomPage/ChatRoomPage'));
const ChatListPage = lazy(() => import('./ChatPage/ChatListPage/ChatListPage'));
const NotFoundPage = lazy(() => import('./404/NotFoundPage'));
const PrivateRoutePage = lazy(() => import('./AuthenticatedPage/PrivateRoutePage'));
const PublicRoutePage = lazy(() => import('./AuthenticatedPage/PublicRoutePage'));

export default function AppRouter() {
  return (
    <Suspense fullback={<Spinner />}>
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
    </Suspense>
  );
}
