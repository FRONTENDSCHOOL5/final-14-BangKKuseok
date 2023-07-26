import React, { useEffect, useRef } from 'react';
import Carousel from '../../components/common/Carousel/Carousel';
import SpaceTabs from '../../components/common/Tabs/SpaceTabs';
import BasicLayout from '../../layout/BasicLayout';
import { useState } from 'react';
import Search from '../SearchPage/SearchPage';
import { useInfiniteQuery } from 'react-query';
import { getAllPost } from '../../api/homeApi';
import styled from 'styled-components';
import Gallery from '../../components/common/Gallery/Gallery';
import { filterPosts } from '../../utils/filterPosts';
import Spinner from '../../components/common/Spinner/Spinner';
import { topLikedPosts as topLikedMockPosts } from '../../mock/mockData';

const Message = styled.p`
  font-weight: 500;
  font-size: ${({ theme }) => theme.fontSize.base};
  color: ${({ theme }) => theme.colors.gray200};
  padding-top: 52px;
  text-align: center;
`;

const TabWrapper = styled.div`
  border-radius: 16px 16px 0 0;
  margin-top: -24px;
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: ${({ theme }) => theme.colors.white};
`;

const PostWrapper = styled.section`
  padding: 0 16px 16px;
`;

export default function HomePage() {
  const [isClickSearchButton, setIsClickSearchButton] = useState(false);
  const [filteredAllPosts, setFilteredAllPosts] = useState([]);
  const [filteredPosts, setfilteredPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [isTabClick, setIsTabClick] = useState(false);

  const count = useRef(0);
  const [isLast, setIsLast] = useState(false);
  const [isRecent, setIsRecent] = useState(false);
  const [topLikedPosts, setTopLikedPosts] = useState([]);

  const TOP_LIKED_POSTS_DAYS = 7;

  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  currentDate.setDate(currentDate.getDate() - TOP_LIKED_POSTS_DAYS);

  const {
    data: homePostData,
    isLoading: homeIsLoading,
    fetchNextPage: homeFetchNextPage,
  } = useInfiniteQuery(
    'homePostData',
    ({ skip = count.current }) => getAllPost({ limit: 100, skip }),
    {
      getNextPageParam: (lastPage) => {
        return lastPage.nextPage + 1;
      },
      onSuccess: (newData) => {
        const pageParam = newData.pageParams.length - 1;
        setAllPosts([...newData.pages[pageParam].data]);
        if (newData.pages[pageParam].isLast) {
          setIsLast(true);
        }

        const allFiltered = allPosts.filter((post) => post.content?.includes('"space"'));
        setFilteredAllPosts((prevData) => [...prevData, ...allFiltered]);
      },
    },
  );

  useEffect(() => {
    setfilteredPosts(homePostData);
  }, []);

  // 홈 피드 100개씩 불러오기
  useEffect(() => {
    if (!isLast) {
      homeFetchNextPage();
      count.current += 100;
    }
  }, [homePostData, homeIsLoading, isLast, homeFetchNextPage]);

  // 캐러셀 필터링
  useEffect(() => {
    const filteredRecentPosts = filteredAllPosts.filter((item) => {
      const createdAt = new Date(item.createdAt);
      if (createdAt <= currentDate) {
        setIsRecent(true);
        return false;
      }
      return true;
    });
    if (filteredRecentPosts.length) {
      setTopLikedPosts(filteredRecentPosts.sort((a, b) => b.heartCount - a.heartCount).slice(0, 5));
    } else {
      setTopLikedPosts([]);
    }
  }, [filteredAllPosts]);

  const handleClickTabButton = (selectedSpaceName) => {
    if (selectedSpaceName) {
      setIsTabClick(true);
      const filter = filteredAllPosts.filter((post) => {
        const { space } = JSON.parse(post.content);
        return selectedSpaceName === '전체' ? space : space === selectedSpaceName;
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

  if (homeIsLoading)
    return (
      <BasicLayout>
        <Spinner />
      </BasicLayout>
    );

  return (
    <>
      {isClickSearchButton ? (
        <Search onClickLeftButton={handleClickLeftButton} />
      ) : (
        <BasicLayout type='home' onClickRightButton={handleClickRightButton}>
          {isRecent ? (
            <Carousel data={topLikedPosts.length > 0 ? topLikedPosts : topLikedMockPosts} />
          ) : (
            <Spinner type='carousel' />
          )}
          <TabWrapper>
            <SpaceTabs onClick={handleClickTabButton} />
          </TabWrapper>
          {filteredPosts?.length === 0 ? (
            <Message>아직 작성된 게시물이 없어요!</Message>
          ) : (
            <PostWrapper>
              <Gallery data={filterPosts(isTabClick ? filteredPosts : filteredAllPosts)} />
            </PostWrapper>
          )}
        </BasicLayout>
      )}
    </>
  );
}
