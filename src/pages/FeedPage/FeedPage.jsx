import React, { useCallback, useEffect, useRef, useState } from 'react';
import BasicLayout from '../../layout/BasicLayout';
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

export default function FeedPage() {
  const [isShow, setIsShow] = useState(false);
  const [isShowConfirm, setIsShowConfirm] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState();
  const [isClickSearchButton, setIsClickSearchButton] = useState(false);

  //서치컴포에서 서치 눌렀을떄
  const handleClickLeftButton = () => {
    setIsClickSearchButton(false);
  };

  //search 버튼 눌렀을때
  const handleClickRightButton = () => {
    setIsClickSearchButton(true);
  };

  //팔로잉 게시글 목록 불러오기
  const {
    data: feedPostData,
    fetchNextPage,
    isLoading,
    isFetching,
    hasNextPage,
  } = useInfiniteQuery(
    'feedPostData',
    ({ pageParam = { skip: 0 } }) => getFeedPost({ skip: pageParam.skip }),
    {
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length > 0 ? allPages.length * 10 : 0;
        return lastPage.data.length < 10 ? undefined : { skip: nextPage };
      },
      select: (data) => {
        return {
          pages: data.pages.flatMap((page) => page.data),
        };
      },
    },
  );

  //스크롤 감지를 위한 IntersectionObserver API
  const observerRef = useRef();
  const handleObserver = useCallback(
    (entries) => {
      const [target] = entries;
      if (target.isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage],
  );

  useEffect(() => {
    const element = observerRef.current;
    const option = { threshold: 0 };
    const observer = new IntersectionObserver(handleObserver, option);
    if (element) {
      observer.observe(element);
      return () => observer.unobserve(element);
    }
  }, [fetchNextPage, handleObserver, isLoading]);

  //게시글 신고하기
  const reportPostMutation = useMutation(reportPost, {
    onSuccess() {
      alert(`해당 게시글을 신고했습니다.`);
    },
    onError(error) {
      console.log(error);
    },
  });

  const handleClickModalOpen = () => {
    setIsShow((prev) => !prev);
  };

  //게시글 더보기 누르기
  const handleClickMorePostButton = (selectedPost) => {
    setSelectedPostId(selectedPost.id);
    setIsShow(true);
  };

  //모달안의 신고하기 목록 누르기
  const handleClickListItem = (e) => {
    setIsShowConfirm(true);
    console.log(e);
  };

  //컨펌창에서 게시글을 신고하기
  const handleClickConfirm = (e) => {
    reportPostMutation.mutate(selectedPostId);
    setIsShowConfirm(false);
    setIsShow(false);
  };

  if (isLoading) {
    return (
      <BasicLayout type='feed'>
        <Spinner />
      </BasicLayout>
    );
  } else if (!isLoading && !isFetching && feedPostData.pages.length === 0) {
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
              posts={feedPostData.pages}
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
