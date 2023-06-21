import React, { useEffect } from 'react';
import { topLikedPosts } from '../../mock/mockData';
import Carousel from '../../components/common/Carousel/Carousel';
import SpaceTabs from '../../components/common/Tabs/SpaceTabs';
import BasicLayout from '../../layout/BasicLayout';
import PostList from '../../components/Profile/PostList/PostList';
import styled from 'styled-components';
import { useState } from 'react';
import { SPACES } from '../../constants/spaces';
import Search from '../SearchPage/SearchPage';
import { useQuery } from 'react-query';
import { getAllPost } from '../../api/homeApi';

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
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isClickSearchButton, setIsClickSearchButton] = useState(false);
  const [filteredAllPosts, setFilteredAllPosts] = useState([]);
  const [filteredPosts, setfilteredPosts] = useState([]);
  const [postDataSkip, setPostDataSkip] = useState(0);
  const [allPosts, setAllPosts] = useState([]);
  const [isTabClick, setIsTabClick] = useState(false);
  const [isFetchDone, setIsFetchDone] = useState(false);

  const { data: postData, isLoading: isPostLoading } = useQuery(
    ['posts', postDataSkip],
    () => {
      return allPosts.length >= postDataSkip && getAllPost(postDataSkip);
    },
    {
      onSuccess: (newData) => {
        // 이전 데이터와 새로운 데이터를 조합하여 전체 데이터로 업데이트
        if (allPosts.length >= postDataSkip) {
          setAllPosts((prevData) => [...prevData, ...newData.posts]);
          setPostDataSkip((prevSkip) => prevSkip + 1000);
        } else {
          setIsFetchDone(true);
        }
      },
    },
  );

  useEffect(() => {
    const allFiltered = allPosts.filter((post) => post.content?.includes('"space"'));
    setFilteredAllPosts(allFiltered);
  }, [allPosts, postData]);

  const handleClickTabButton = (e) => {
    const index = ['전체', ...SPACES].indexOf(e.target.innerText);
    if (e.target.tagName === 'BUTTON') {
      setScrollLeft(e.currentTarget.scrollLeft); // 버튼 클릭했을 때 scrollLeft 위치 유지
      setCurrentTab(index);
      setIsTabClick(true);

      const filter = filteredAllPosts.filter((post) => {
        const parsedContent = JSON.parse(post.content);
        return e.target.innerText === '전체'
          ? parsedContent.space
          : parsedContent.space === e.target.innerText;
      });

      setfilteredPosts(filter);
    }
  };

  const handleClickLeftButton = () => {
    setIsClickSearchButton(false);
  };

  const handleClickRightButton = () => {
    setIsClickSearchButton(true);
  };

  if (!isFetchDone)
    return (
      <BasicLayout>
        <span>로딩중..</span>
      </BasicLayout>
    );

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
          {filteredAllPosts.length === 0 ? (
            <Message>작성된 게시물이 없습니다.</Message>
          ) : (
            <PostList selectedTab='grid' posts={isTabClick ? filteredPosts : filteredAllPosts} />
          )}
        </BasicLayout>
      )}
    </>
  );
}
