import React from 'react';
import { posts, topLikedPosts } from '../../mock/mockData';
import Carousel from '../../components/common/Carousel/Carousel';
import SpaceTabs from '../../components/common/Tabs/SpaceTabs';
import BasicLayout from '../../layout/BasicLayout';
import PostList from '../../components/Profile/PostList/PostList';
import styled from 'styled-components';
import { useState } from 'react';
import { SPACES } from '../../constants/spaces';
import Search from '../SearchPage/SearchPage';

const Message = styled.p`
  font-weight: 500;
  font-size: ${({ theme }) => theme.fontSize.base};
  color: ${({ theme }) => theme.colors.gray200};
  padding-top: 52px;
  text-align: center;
`;

const TabWrapper = styled.div`
  border-radius: 16px 16px 0 0;
  margin-top: -16px;
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: ${({ theme }) => theme.colors.white};
`;

export default function HomePage() {
  const [currentTab, setCurrentTab] = useState(0);
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isClickSearchButton, setIsClickSearchButton] = useState(false);

  const handleClickTabButton = (e) => {
    const index = ['전체', ...SPACES].indexOf(e.target.innerText);
    if (e.target.tagName === 'BUTTON') {
      setScrollLeft(e.currentTarget.scrollLeft); // 버튼 클릭했을 때 scrollLeft 위치 유지
      setCurrentTab(index);
      const filtered = posts.filter((post) => {
        const parsedContent = JSON.parse(post.content);
        return e.target.innerText === '전체' ? posts : parsedContent.space === e.target.innerText;
      });
      setFilteredPosts(filtered);
    }
  };

  const handleClickLeftButton = () => {
    setIsClickSearchButton(false);
  };

  const handleClickRightButton = () => {
    setIsClickSearchButton(true);
  };

  return (
    <>
      {isClickSearchButton ? (
        <Search onClickLeftButton={handleClickLeftButton} />
      ) : (
        <BasicLayout type='home' onClickRightButton={handleClickRightButton}>
          <Carousel data={topLikedPosts} />
          <TabWrapper>
            <SpaceTabs
              currentTab={currentTab}
              onClick={handleClickTabButton}
              scrollLeft={scrollLeft}
            />
          </TabWrapper>
          {filteredPosts.length >= 1 ? (
            <PostList selectedTab='grid' posts={filteredPosts} />
          ) : (
            <Message>작성된 게시물이 없습니다.</Message>
          )}
        </BasicLayout>
      )}
    </>
  );
}
