import React, { useEffect, useRef } from 'react';
import Carousel from '../../components/common/Carousel/Carousel';
import SpaceTabs from '../../components/common/Tabs/SpaceTabs';
import BasicLayout from '../../layout/BasicLayout';
import { useState } from 'react';
import { SPACES } from '../../constants/common';
import Search from '../SearchPage/SearchPage';
import { useInfiniteQuery } from 'react-query';
import { getAllPost } from '../../api/homeApi';
import styled from 'styled-components';
import Gallery from '../../components/common/Gallery/Gallery';
import { filterPosts } from '../../utils/filterPosts';
import Spinner from '../../components/common/Spinner/Spinner';
import { topLikedPosts } from '../../mock/mockData';
import { getFeedPost } from '../../api/feedApi';

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
  const [currentTab, setCurrentTab] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isClickSearchButton, setIsClickSearchButton] = useState(false);
  const [filteredAllPosts, setFilteredAllPosts] = useState([]);
  const [filteredPosts, setfilteredPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [isTabClick, setIsTabClick] = useState(false);

  const count = useRef(0);
  const [isLast, setIsLast] = useState(false);

  // 캐러셀 팔로잉 게시글 목록 불러오기
  const {
    data: feedPostData,
    fetchNextPage: feedFetchNextPage,
    isLoading: feedIsLoading,
    isFetching: feedIsFetching,
    hasNextPage: feedHasNextPage,
  } = useInfiniteQuery(
    'feedPostData',
    ({ pageParam = { skip: 0 } }) => getFeedPost({ skip: pageParam.skip }),
    {
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length > 0 ? allPages.length * 10 : 0;
        return lastPage.data.length < 10 ? undefined : { skip: nextPage };
      },
      select: (data) => {
        return data.pages
          .flatMap((page) => page.data)
          .filter((post) => post.content?.includes('"space"'))
          .sort((a, b) => b.heartCount - a.heartCount)
          .slice(0, 5);
      },
      refetchOnWindowFocus: true,
    },
  );

  const {
    data: homePostData,
    isLoading: homeIsLoading,
    isFetching: homeIsFetching,
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

  // 홈 피드 100개씩 불러오기
  useEffect(() => {
    if (!isLast) {
      homeFetchNextPage();
      count.current += 100;
    }
  }, [homePostData, homeIsLoading, isLast, homeFetchNextPage]);

  // 캐러셀 필터링
  useEffect(() => {
    if (feedHasNextPage) {
      feedFetchNextPage();
    }
  }, [feedHasNextPage]);

  const handleClickTabButton = (e) => {
    const index = ['전체', ...SPACES].indexOf(e.target.innerText);
    if (e.target.tagName === 'BUTTON') {
      setScrollLeft(e.currentTarget.scrollLeft); // 버튼 클릭했을 때 scrollLeft 위치 유지
      setCurrentTab(index);
      setIsTabClick(true);

      const filter = filteredAllPosts.filter((post) => {
        const { space } = JSON.parse(post.content);
        return e.target.innerText === '전체' ? space : space === e.target.innerText;
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

  if (homeIsLoading || feedIsLoading || feedIsFetching) return <Spinner />;

  return (
    <>
      {isClickSearchButton ? (
        <Search onClickLeftButton={handleClickLeftButton} />
      ) : (
        <BasicLayout type='home' onClickRightButton={handleClickRightButton}>
          <Carousel data={feedPostData?.length > 0 ? feedPostData : topLikedPosts} />
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
            <PostWrapper>
              <Gallery data={filterPosts(isTabClick ? filteredPosts : filteredAllPosts)} />
            </PostWrapper>
          )}
        </BasicLayout>
      )}
    </>
  );
}
