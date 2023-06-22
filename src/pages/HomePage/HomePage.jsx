import React, { useEffect, useRef } from 'react';
import { topLikedPosts } from '../../mock/mockData';
import Carousel from '../../components/common/Carousel/Carousel';
import SpaceTabs from '../../components/common/Tabs/SpaceTabs';
import BasicLayout from '../../layout/BasicLayout';
import PostList from '../../components/Profile/PostList/PostList';
import styled from 'styled-components';
import { useState } from 'react';
import { SPACES } from '../../constants/spaces';
import Search from '../SearchPage/SearchPage';
import { useInfiniteQuery } from 'react-query';
import { getAllPost } from '../../api/homeApi';

export default function HomePage() {
  const [currentTab, setCurrentTab] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isClickSearchButton, setIsClickSearchButton] = useState(false);
  const [filteredAllPosts, setFilteredAllPosts] = useState([]);
  const [filteredPosts, setfilteredPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [isTabClick, setIsTabClick] = useState(false);

  const count = useRef(0);
  const [isLast, setIsLast] = useState(false);

  const {
    data: postData,
    fetchNextPage,
    isLoading,
    hasPreviousPage,
  } = useInfiniteQuery('posts', ({ skip = count.current }) => getAllPost({ limit: 100, skip }), {
    getNextPageParam: (lastPage) => {
      return lastPage.nextPage + 1;
    },
    onSuccess: (newData) => {
      const pageParam = newData.pageParams.length - 1;
      setAllPosts([...newData.pages[pageParam].data]);
      if (newData.pages[pageParam].isLast) {
        setIsLast(true);
      }
    },
  });

  useEffect(() => {
    if (!isLoading && !isLast) {
      count.current += 100;
      fetchNextPage();
    }
  }, [postData, fetchNextPage, isLoading, isLast]);

  useEffect(() => {
    const allFiltered = allPosts.filter((post) => post.content?.includes('"space"'));
    setFilteredAllPosts((prevData) => [...prevData, ...allFiltered]);
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

  if (hasPreviousPage)
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
