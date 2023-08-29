import React, { useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import BasicLayout from '../../../layout/BasicLayout';
import ProfileCard from '../../../components/Profile/ProfileCard/ProfileCard';
import ProductList from '../../../components/Profile/ProductList/ProductList';
import ViewTabs from '../../../components/common/Tabs/ViewTabs';
import PostList from '../../../components/Profile/PostList/PostList';
import BottomSheet from '../../../components/common/BottomSheet/BottomSheet';
import ListModal from '../../../components/common/BottomSheet/ListModal';
import BasicModal from '../../../components/common/BottomSheet/BasicModal';
import ProductDetailCard from '../../../components/Profile/ProductDetailCard/ProductDetailCard';
import Confirm from '../../../components/common/Confirm/Confirm';
import Spinner from '../../../components/common/Spinner/Spinner';
import useObserver from '../../../hooks/useObserver';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getMyProfile, getProfile } from '../../../api/profileApi';
import { deleteProduct, getProducts } from '../../../api/productApi';
import { deletePost, getMyPost, reportPost } from '../../../api/postApi';
import { TOAST } from '../../../constants/common';
import { MYPOSTLIMIT } from '../../../constants/pagenation';
import TopButton from '../../../components/common/Button/TopButton/TopButton';
import useScroll from '../../../hooks/useScroll';
import { useRecoilValue } from 'recoil';
import { myProfileDataAtom } from '../../../atoms/myProfile';

import useModal from '../../../hooks/useModal';
import useReportMutation from '../../../hooks/useReportMutation';
import useInfiniteDataQuery from '../../../hooks/useInfiniteDataQuery';

const ProfilePageWrapper = styled.main``;

const Message = styled.p`
  font-weight: 500;
  font-size: ${({ theme }) => theme.fontSize.base};
  color: ${({ theme }) => theme.colors.gray200};
  padding-top: 52px;
  text-align: center;
`;

export default function ProfilePage() {
  const wrapperRef = useScroll();
  const navigate = useNavigate();
  const { accountname: accountnameByParams } = useParams();

  const [selectedTab, setSelectedTab] = useState('list');
  const [selectedPost, setSelectedPost] = useState({});
  const [productId, setProductId] = useState(0);

  const [isShowConfirm, setIsShowConfirm] = useState(false);
  const [confirmType, setConfirmType] = useState({ type: '', object: '' });

  const myProfileData = useRecoilValue(myProfileDataAtom);
  const queryClient = useQueryClient();

  const { modalData, openModal, closeModal } = useModal('');

  // 프로필 정보 받기
  const { data: profileData, isLoading: isProfileLoading } = useQuery(
    ['profile', accountnameByParams],
    () => (accountnameByParams ? getProfile(accountnameByParams) : getMyProfile()),
    { refetchOnWindowFocus: true },
  );

  // 게시글 정보 가져오기
  const {
    data: myPostData,
    fetchNextPage: fetchPostNextPage,
    isLoading: isMyPostLoading,
    hasNextPage: hasPostNextPage,
  } = useInfiniteDataQuery(['myPost', profileData], getMyPost, {
    limit: MYPOSTLIMIT,
    select: (data) => {
      return data.pages.flatMap((page) => page.data);
    },
    enabled: !!profileData,
  });

  const observerRef = useObserver(hasPostNextPage, fetchPostNextPage, isMyPostLoading);

  // 상품 정보 가져오기
  const { data: myProductData, isLoading: isProductLoading } = useQuery(
    ['myProduct', profileData],
    () => getProducts(profileData.accountname),
    {
      enabled: !!profileData,
    },
  );

  // 상품 삭제하기
  const deleteProductMutation = useMutation(deleteProduct, {
    onSuccess() {
      toast('✅ 상품이 삭제되었습니다.', TOAST);
      queryClient.invalidateQueries('myProduct');
    },
    onError(error) {
      console.log(error);
    },
  });

  // 게시글 삭제하기
  const deletePostMutation = useMutation(deletePost, {
    onSuccess() {
      toast('✅ 게시물이 삭제되었습니다.', TOAST);
      queryClient.invalidateQueries('myPost');
    },
    onError(error) {
      console.log(error);
    },
  });

  //게시글 신고하기
  const reportPostMutation = useReportMutation(reportPost);

  const handleClickTabButton = (tabId) => {
    setSelectedTab(tabId);
  };

  const handleClickMoreProfileButton = () => {
    openModal('profile');
  };

  const handleClickMorePostButton = (selectedPost) => {
    setSelectedPost(selectedPost);
    if (myProfileData.accountname === selectedPost.author.accountname) {
      openModal('myPost');
    } else {
      openModal('userPost');
    }
  };

  const handleClickProduct = (selectedProductId) => {
    setProductId(selectedProductId);
    openModal('productDetail');
  };

  const handleClickLModalItem = (e) => {
    if (modalData.modalType === 'profile') {
      if (e.target.innerText === '로그아웃') {
        setConfirmType({ type: 'logout' });
      } else {
        navigate(`/profile/edit`, { state: myProfileData });
        closeModal();
      }
    }
    if (modalData.modalType === 'productDetail') {
      if (e.target.innerText === '삭제') {
        setConfirmType({ type: 'delete', object: 'product' });
      } else {
        navigate(`/product/${productId}/edit`, {
          state: productId,
        });
        closeModal();
      }
    }
    if (modalData.modalType === 'myPost' || modalData.modalType === 'userPost') {
      if (e.target.innerText === '삭제') {
        setConfirmType({ type: 'delete', object: 'post' });
      } else if (e.target.innerText === '신고하기') {
        setConfirmType({ type: 'report', object: 'post' });
      } else {
        navigate(`/post/${selectedPost.id}/edit`);
        closeModal();
      }
    }
    setIsShowConfirm(true);
  };

  const handleClickConfirm = () => {
    switch (confirmType.object) {
      case 'product':
        if (confirmType.type === 'delete') {
          deleteProductMutation.mutate(productId);
        }
        break;
      case 'post':
        if (confirmType.type === 'delete') {
          deletePostMutation.mutate(selectedPost.id);
        } else if (confirmType.type === 'report') {
          reportPostMutation.mutate(selectedPost.id);
        }
        break;
      default:
        // object가 없는 경우 === 로그아웃
        localStorage.removeItem('token');
        localStorage.removeItem('myProfileData');
        navigate('/');
        break;
    }
    setIsShowConfirm(false);
    closeModal();
  };

  // 로딩중일때
  if (isMyPostLoading || isProfileLoading || isProductLoading) {
    return (
      <BasicLayout type={'profile'} onClickRightButton={handleClickMoreProfileButton}>
        <Spinner />
      </BasicLayout>
    );
  }

  return (
    <BasicLayout
      type={'profile'}
      onClickRightButton={handleClickMoreProfileButton}
      ref={wrapperRef}
    >
      {!isProfileLoading && !isMyPostLoading && !isProductLoading && (
        <ProfilePageWrapper>
          <>
            <ProfileCard
              profile={profileData}
              isMyProfile={profileData.accountname === myProfileData.accountname}
            />
            {myProductData.length > 0 && (
              <ProductList products={myProductData} onClick={handleClickProduct} />
            )}
            {myPostData.length > 0 ? (
              <>
                <ViewTabs selectedTab={selectedTab} onClick={handleClickTabButton} />
                <PostList
                  selectedTab={selectedTab}
                  posts={myPostData}
                  moreInfo={false}
                  onClick={handleClickMorePostButton}
                />
                <div ref={observerRef} style={{ minHeight: '1px' }}></div>
              </>
            ) : (
              <Message>작성된 게시물이 없습니다.</Message>
            )}
          </>
          <TopButton reference={wrapperRef} />

          {/* -- BottomSheet */}
          <BottomSheet>
            {modalData.modalType === 'productDetail' ? (
              <BasicModal>
                {productId && (
                  <ProductDetailCard
                    isMyProfile={profileData.accountname === myProfileData.accountname}
                    productId={productId}
                    onClick={handleClickLModalItem}
                  />
                )}
              </BasicModal>
            ) : (
              <ListModal onClick={handleClickLModalItem} />
            )}
          </BottomSheet>

          {/* -- Confirm */}
          {isShowConfirm && (
            <Confirm
              type={confirmType.type}
              object={confirmType.object}
              setIsShowConfirm={setIsShowConfirm}
              onClick={handleClickConfirm}
            />
          )}
        </ProfilePageWrapper>
      )}
    </BasicLayout>
  );
}
