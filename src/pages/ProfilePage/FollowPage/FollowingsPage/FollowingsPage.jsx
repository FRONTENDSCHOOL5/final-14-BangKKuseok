import React from 'react';
import BasicLayout from '../../../../layout/BasicLayout';
import { useLocation, useNavigate } from 'react-router-dom';
import { FollowerWrapper, FollowerList, FollowItem } from '../FollowersPage/FollowersPageStyle';
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from 'react-query';
import { deleteUnFollow, getFollowings, postFollow } from '../../../../api/followApi';
import UserSimpleInfo from '../../../../components/common/UserSimpleInfo/UserSimpleInfo/UserSimpleInfo';
import Spinner from '../../../../components/common/Spinner/Spinner';
import useObserver from '../../../../hooks/useObserver';
import { getMyProfile } from '../../../../api/profileApi';

export default function FollowingsPage() {
  const navigate = useNavigate();
  const accountname = useLocation().state.accountname;

  const {
    data: followings,
    fetchNextPage,
    isLoading,
    isFetching,
    hasNextPage,
  } = useInfiniteQuery(
    'followings',
    ({ pageParam = { skip: 0 } }) =>
      getFollowings({ accountname: accountname, skip: pageParam.skip }),
    {
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length > 0 ? allPages.length * 10 : 0;
        return lastPage.data.length < 10 ? undefined : { skip: nextPage };
      },
      select: (data) => {
        return data.pages.flatMap((page) => page.data);
      },
      enabled: !!accountname,
    },
  );
  const observerRef = useObserver(hasNextPage, fetchNextPage, isLoading);

  const queryClient = useQueryClient();

  const { data: myProfileData } = useQuery('myProfile', getMyProfile);

  // 팔로우 API
  const postFollowMutation = useMutation(postFollow, {
    onSuccess: () => {
      queryClient.invalidateQueries('followings');
    },
    onError: () => {
      console.error('팔로우 실패');
    },
  });

  // 언팔로우 API
  const deleteUnFollowMutation = useMutation(deleteUnFollow, {
    onSuccess: () => {
      queryClient.invalidateQueries('followings');
    },
    onError: () => {
      console.error('언팔로우 실패');
    },
  });

  const handleClickBackButton = () => {
    navigate(-1);
  };

  const handleClickFollow = (accountname) => {
    // 팔로우 API 요청
    postFollowMutation.mutate(accountname);
  };

  const handleClickUnFollow = (accountname) => {
    // 언팔로우 API 요청
    deleteUnFollowMutation.mutate(accountname);
  };

  return (
    <BasicLayout type='follow' title='팔로잉' onClickLeftButton={handleClickBackButton}>
      <FollowerWrapper>
        <>
          <FollowerList>
            {followings?.map((following) => (
              <FollowItem key={following._id}>
                <UserSimpleInfo
                  profile={following}
                  type='follow'
                  isLink={true}
                  isMyProfile={myProfileData?.accountname === following.accountname}
                  onClick={following.isfollow ? handleClickUnFollow : handleClickFollow}
                />
              </FollowItem>
            ))}
          </FollowerList>
        </>
        <div ref={observerRef} style={{ minHeight: '1px' }}>
          {(isLoading || isFetching) && <Spinner />}
        </div>
      </FollowerWrapper>
    </BasicLayout>
  );
}
