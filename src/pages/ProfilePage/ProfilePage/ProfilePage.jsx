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
import { posts, products } from '../../../mock/mockData';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getMyProfile, getProfile } from '../../../api/profileApi';
import { deleteProduct } from '../../../api/productApi';
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
  const [selectedProduct, setSelectedProduct] = useState('');
  const [isShowMoreProfile, setIsShowMoreProfile] = useState(false);
  const [isShowMorePost, setIsShowMorePost] = useState(false);
  const [isShowProductDetail, setIsShowProductDetail] = useState(false);


  const queryClient = useQueryClient();

  // 프로필 정보 받기
  const { data: profileData, isLoading: isProfileLoading } = useQuery('profile', () =>
    accountnameByParams ? getProfile(accountnameByParams) : getMyProfile(),
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

  // 상품 삭제하기
  const deleteProductMutation = useMutation(deleteProduct, {
    onSuccess() {
      alert('상품이 삭제되었습니다.');
      // queryClient.invalidateQueries('myProduct');
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
  };

  const handleClickMorePostButton = () => {
    setIsShowMorePost(true);
  };

  const handleClickProduct = (productId) => {
    if (!isShowProductDetail) {
      const selectedProductInfo = products.filter((product) => product.id === productId);
      setSelectedProduct(selectedProductInfo);
    }
    setIsShowProductDetail(true);
  };

  const handleClickCloseModal = () => {
    setIsShowMoreProfile(false);
    setIsShowMorePost(false);
    setIsShowProductDetail(false);
  };

  return (
    <BasicLayout
      type={'profile'}
      onClickLeftButton={() => navigate(-1)}
      onClickRightButton={handleClickMoreProfileButton}
    >
      <ProfilePageWrapper>
        {(accountnameByParams ? !isUserProfileLoading : !isMyProfileLoading) && (
          <>
            <ProfileCard
              profile={accountnameByParams ? userProfileData.profile : myProfileData.user}
            />
            <ProductList products={products} onClick={handleClickProduct} />
            {posts.length > 0 ? (
              <>
                <ViewTabs selectedTab={selectedTab} onClick={handleClickTabButton} />
                <PostList
                  selectedTab={selectedTab}
                  posts={posts}
                  moreInfo={false}
                  onClick={handleClickMorePostButton}
                />
              </>
            ) : (
              <Message>작성된 게시물이 없습니다.</Message>
            )}
          </>
        )}

        {/* -- BottomSheet */}
        <BottomSheet isShow={isShowMoreProfile} onClick={handleClickCloseModal}>
          <ListModal type='profile' />
        </BottomSheet>
        <BottomSheet isShow={isShowMorePost} onClick={handleClickCloseModal}>
          <ListModal type='myPost' />
        </BottomSheet>
        <BottomSheet isShow={isShowProductDetail} onClick={handleClickCloseModal}>
          <BasicModal>
            <ProductDetailCard selectedProduct={selectedProduct} />
          </BasicModal>
        </BottomSheet>
      </ProfilePageWrapper>
    </BasicLayout>
  );
}
