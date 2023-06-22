import React, { useCallback, useEffect, useRef, useState } from 'react';
import BasicLayout from '../../layout/BasicLayout';
import { useNavigate } from 'react-router-dom';
import PostList from '../../components/Profile/PostList/PostList';
import { useInfiniteQuery, useMutation } from 'react-query';
import { getFeedPost } from '../../api/feedApi';
import Spinner from '../../components/common/Spinner/Spinner';
import { FeedPageWrapper, NoneFeedWrapper } from './FeedPageStyle';
import logoGrayImg from '../../assets/images/logo-gray.png';
import Button from '../../components/common/Button/Button/Button';
import { reportPost } from '../../api/postApi';
import BottomSheet from '../../components/common/BottomSheet/BottomSheet';
import ListModal from '../../components/common/BottomSheet/ListModal';
import Confirm from '../../components/common/Confirm/Confirm';
import Search from '../SearchPage/SearchPage';
import { useRecoilState } from 'recoil';
import { feedDataAtom, isLastFeedAtom } from '../../atoms/feed';

export default function FeedPage() {
  const navigate = useNavigate();
  const count = useRef(0);
  const [isLast, setIsLast] = useRecoilState(isLastFeedAtom);
  const [feedPosts, setFeedPosts] = useRecoilState(feedDataAtom);
  const [isShow, setIsShow] = useState(false);
  const [isShowConfirm, setIsShowConfirm] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState();
  const [isClickSearchButton, setIsClickSearchButton] = useState(false);
  //팔로잉 게시글 목록 불러오기
  const {
    data: feedPostData,
    fetchNextPage,
    isLoading,
    isFetching,
  } = useInfiniteQuery('feedPostData', ({ skip = count.current }) => getFeedPost({ skip }), {
    enabled: !isLast,
    getNextPageParam: (lastPage) => {
      return lastPage.nextPage + 1;
    },
    onSuccess: (newData) => {
      const pageParam = newData.pageParams.length - 1;
      setFeedPosts([...newData.pages.flatMap((pages) => pages.data)]);
      if (newData.pages[pageParam].isLast) {
        setIsLast(true);
      }
    },
  });

  //스크롤 감지를 위한 IntersectionObserver API
  const observerRef = useRef();
  const handleObserver = useCallback(
    (entries) => {
      const [target] = entries;
      if (target.isIntersecting) {
        count.current += 10;
        fetchNextPage();
      }
    },
    [fetchNextPage],
  );

  useEffect(() => {
    const element = observerRef.current;
    const option = { threshold: 0 };
    const observer = new IntersectionObserver(handleObserver, option);
    if (element && !isLast) {
      observer.observe(element);
      return () => observer.unobserve(element);
    }
  }, [fetchNextPage, handleObserver, isLast, isLoading]);
  if (isLoading && feedPosts.length === 0) {
    return (
      <BasicLayout type='feed'>
        <Spinner />
      </BasicLayout>
    );
  } else if (!isLoading && !isFetching && feedPosts.length === 0) {
    return (
      <BasicLayout type='feed' onClickRightButton={handleClickRightButton}>
        <NoneFeedWrapper>
          <img src={logoGrayImg} alt='로고 이미지' />
          <p>사용자를 검색해 팔로우 해보세요!</p>
          <Button size='md' onClick={handleClickRightButton}>
            검색하기
          </Button>
        </NoneFeedWrapper>
      </BasicLayout>
    );
  }

  return (
    <>
      {isClickSearchButton ? (
        <Search onClickLeftButton={handleClickLeftButton} />
      ) : (
        <BasicLayout type='feed' onClickRightButton={handleClickRightButton}>
          <FeedPageWrapper>
            <PostList
              selectedTab='list'
              posts={feedPosts}
              moreInfo={false}
              onClick={handleClickMorePostButton}
            />
          </FeedPageWrapper>
          <div ref={observerRef}></div>
          {isShow && (
            <BottomSheet isShow={isShow} onClick={handleClickModalOpen}>
              <ListModal type='userPost' onClick={handleClickListItem} />
            </BottomSheet>
          )}
          {isShowConfirm && (
            <Confirm
              type='report'
              object='post'
              setIsShowConfirm={setIsShowConfirm}
              onClick={handleClickConfirm}
            />
          )}
        </BasicLayout>
      )}
    </>
  );
}
