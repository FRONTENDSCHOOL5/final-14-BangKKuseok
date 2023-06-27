import React, { useState } from 'react';
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
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getMyProfile, getProfile } from '../../../api/profileApi';
import { deleteProduct, getProducts } from '../../../api/productApi';
import { deletePost, getMyPost, reportPost } from '../../../api/postApi';

const ProfilePageWrapper = styled.main``;

const Message = styled.p`
  font-weight: 500;
  font-size: ${({ theme }) => theme.fontSize.base};
  color: ${({ theme }) => theme.colors.gray200};
  padding-top: 52px;
  text-align: center;
`;

export default function ProfilePage() {
  const navigate = useNavigate();
  const { accountname: accountnameByParams } = useParams();

  const [selectedTab, setSelectedTab] = useState('list');
  const [selectedPost, setSelectedPost] = useState({});
  const [productId, setProductId] = useState(0);

  const [isShowMoreProfile, setIsShowMoreProfile] = useState(false);
  const [isShowMorePost, setIsShowMorePost] = useState(false);
  const [isShowProductDetail, setIsShowProductDetail] = useState(false);

  const [isShowConfirm, setIsShowConfirm] = useState(false);
  const [confirmType, setConfirmType] = useState({ type: '', object: '' });
  const [modalType, setModalType] = useState('');

  const queryClient = useQueryClient();

  // 프로필 정보 받기
  const { data: profileData, isLoading: isProfileLoading } = useQuery(
    ['profile', accountnameByParams],
    () => (accountnameByParams ? getProfile(accountnameByParams) : getMyProfile()),
    { refetchOnWindowFocus: true },
  );

  const { data: myProfileData, isLoading: isMyProfileLoading } = useQuery(
    'myProfile',
    getMyProfile,
  );

  // 게시글 정보 가져오기
  const { data: myPostData, isLoading: isMyPostLoading } = useQuery(
    ['myPost', profileData],
    () => getMyPost(profileData.accountname),
    {
      enabled: !!profileData && !!myProfileData,
    },
  );

  // 상품 정보 가져오기
  const { data: myProductData, isLoading: isProductLoading } = useQuery(
    ['myProduct', profileData],
    () => getProducts(profileData.accountname),
    {
      enabled: !!profileData && !!myProfileData,
    },
  );

  // 상품 삭제하기
  const deleteProductMutation = useMutation(deleteProduct, {
    onSuccess() {
      alert('상품이 삭제되었습니다.');
      queryClient.invalidateQueries('myProduct');
    },
    onError(error) {
      console.log(error);
    },
  });

  // 게시글 삭제하기
  const deletePostMutation = useMutation(deletePost, {
    onSuccess() {
      alert('게시물이 삭제되었습니다.');
      queryClient.invalidateQueries('myPost');
    },
    onError(error) {
      console.log(error);
    },
  });

  //게시글 신고하기
  const reportPostMutation = useMutation(reportPost, {
    onSuccess() {
      alert(`해당 게시글을 신고했습니다.`);
    },
    onError(error) {
      console.log(error);
    },
  });

  const handleClickTabButton = (tabId) => {
    setSelectedTab(tabId);
  };

  const handleClickMoreProfileButton = () => {
    setIsShowMoreProfile(true);
    setModalType('profile');
  };

  const handleClickMorePostButton = (selectedPost) => {
    setSelectedPost(selectedPost);
    setIsShowMorePost(true);
    if (myProfileData.accountname === selectedPost.author.accountname) {
      setModalType('myPost');
    } else {
      setModalType('userPost');
    }
  };

  const handleClickProduct = (selectedProductId) => {
    setProductId(selectedProductId);
    setIsShowProductDetail(true);
  };

  const handleClickCloseModal = () => {
    setIsShowMoreProfile(false);
    setIsShowMorePost(false);
    setIsShowProductDetail(false);
  };

  const handleClickLModalItem = (e) => {
    if (isShowMoreProfile) {
      if (e.target.innerText === '로그아웃') {
        setConfirmType({ type: 'logout' });
      } else {
        navigate(`/profile/edit`, { state: myProfileData });
      }
    }

    if (isShowProductDetail) {
      if (e.target.innerText === '삭제') {
        setConfirmType({ type: 'delete', object: 'product' });
      } else {
        navigate(`/product/${productId}/edit`, { state: productId });
      }
    }

    if (isShowMorePost) {
      if (e.target.innerText === '삭제') {
        setConfirmType({ type: 'delete', object: 'post' });
      } else if (e.target.innerText === '신고하기') {
        setConfirmType({ type: 'report', object: 'post' });
      } else {
        navigate(`/post/${selectedPost.id}/edit`);
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
        queryClient.removeQueries('myProfile');
        localStorage.removeItem('token');
        navigate('/main');
        break;
    }
    setIsShowConfirm(false);
    handleClickCloseModal();
  };

  // 로딩중일때
  if (isMyPostLoading || isProfileLoading || isMyProfileLoading || isProductLoading) {
    return (
      <BasicLayout
        type={'profile'}
        onClickLeftButton={() => navigate(-1)}
        onClickRightButton={handleClickMoreProfileButton}
      >
        <Spinner />
      </BasicLayout>
    );
  }

  return (
    <BasicLayout
      type={'profile'}
      onClickLeftButton={() => navigate(-1)}
      onClickRightButton={handleClickMoreProfileButton}
    >
      {!isProfileLoading && !isMyProfileLoading && !isMyPostLoading && !isProductLoading && (
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
              </>
            ) : (
              <Message>작성된 게시물이 없습니다.</Message>
            )}
          </>

          {/* -- BottomSheet */}
          <BottomSheet isShow={isShowMoreProfile || isShowMorePost} onClick={handleClickCloseModal}>
            <ListModal type={modalType} onClick={handleClickLModalItem} />
          </BottomSheet>
          <BottomSheet isShow={isShowProductDetail} onClick={handleClickCloseModal}>
            <BasicModal>
              {productId && (
                <ProductDetailCard
                  isMyProfile={profileData.accountname === myProfileData.accountname}
                  productId={productId}
                  onClick={handleClickLModalItem}
                />
              )}
            </BasicModal>
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
