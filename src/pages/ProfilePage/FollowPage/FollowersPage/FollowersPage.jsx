import React, { useEffect } from 'react';
import BasicLayout from '../../../../layout/BasicLayout';
import { useLocation, useNavigate } from 'react-router-dom';
import { FollowerWrapper, FollowerList, FollowItem } from './FollowersPageStyle';
import { useInfiniteQuery, useQueryClient } from 'react-query';
import { getFollowers } from '../../../../api/followApi';
import UserSimpleInfo from '../../../../components/common/UserSimpleInfo/UserSimpleInfo/UserSimpleInfo';
import Spinner from '../../../../components/common/Spinner/Spinner';
import useObserver from '../../../../hooks/useObserver';

export default function FollowersPage() {
  const navigate = useNavigate();
  const accountname = useLocation().state.accountname;

  const handleClickBackButton = () => {
    navigate(-1);
  };

  const {
    data: followers,
    fetchNextPage,
    isLoading,
    isFetching,
    hasNextPage,
  } = useInfiniteQuery(
    'followers',
    ({ pageParam = { skip: 0 } }) =>
      getFollowers({ accountname: accountname, skip: pageParam.skip }),
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

  if (isLoading && isFetching) {
    return <Spinner />;
  }

  return (
    <BasicLayout type='follow' title='팔로워' onClickLeftButton={handleClickBackButton}>
      <FollowerWrapper>
        {!isLoading && !isFetching && (
          <>
            <FollowerList>
              {followers?.map((follower) => (
                <FollowItem key={follower._id}>
                  <UserSimpleInfo profile={follower} type='follow' isLink={true} />
                </FollowItem>
              ))}
            </FollowerList>
            <div ref={observerRef}></div>
          </>
        )}
      </FollowerWrapper>
    </BasicLayout>
  );
}
