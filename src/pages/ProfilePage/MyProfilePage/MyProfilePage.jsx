import React, { useState } from 'react';
import styled from 'styled-components';
import BasicLayout from '../../../layout/BasicLayout';
import ProfileCard from '../../../components/Profile/ProfileCard/ProfileCard';
import ProductList from '../../../components/Profile/ProductList/ProductList';
import ViewTabs from '../../../components/common/Tabs/ViewTabs';
import PostList from '../../../components/Profile/PostList/PostList';
import { posts, products, profile } from '../../../mock/mockData';

const ProfilePageWrapper = styled.main``;

const Message = styled.p`
  font-weight: 500;
  font-size: ${({ theme }) => theme.fontSize.base};
  color: ${({ theme }) => theme.colors.gray200};
  padding-top: 52px;
  text-align: center;
`;

export default function MyProfile() {
  const [selectedTab, setSelectedTab] = useState('list');

  const handleClickTabButton = (tabId) => {
    setSelectedTab(tabId);
  };

  return (
    <BasicLayout type={'profile'}>
      <ProfilePageWrapper>
        <ProfileCard profile={profile} />
        <ProductList products={products} />
        {posts.length > 1 ? (
          <>
            <ViewTabs selectedTab={selectedTab} onClick={handleClickTabButton} />
            <PostList selectedTab={selectedTab} posts={posts} moreInfo={false} />
          </>
        ) : (
          <Message>작성된 게시물이 없습니다.</Message>
        )}
      </ProfilePageWrapper>
    </BasicLayout>
  );
}
