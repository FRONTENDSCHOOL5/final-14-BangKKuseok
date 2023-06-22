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
