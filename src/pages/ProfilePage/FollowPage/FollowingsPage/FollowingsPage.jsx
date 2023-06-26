import React from 'react';
import BasicLayout from '../../../../layout/BasicLayout';
import { useLocation, useNavigate } from 'react-router-dom';
import { FollowerWrapper, FollowerList, FollowItem } from '../FollowersPage/FollowersPageStyle';
import { useInfiniteQuery } from 'react-query';
import { getFollowings } from '../../../../api/followApi';
import UserSimpleInfo from '../../../../components/common/UserSimpleInfo/UserSimpleInfo/UserSimpleInfo';
import Spinner from '../../../../components/common/Spinner/Spinner';
import useObserver from '../../../../hooks/useObserver';

export default function FollowingsPage() {
  const navigate = useNavigate();
  const accountname = useLocation().state.accountname;

  const handleClickBackButton = () => {
    navigate(-1);
  };

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

  if (isLoading && isFetching) {
    return <Spinner />;
  }

  return (
    <BasicLayout type='follow' title='팔로잉' onClickLeftButton={handleClickBackButton}>
      <FollowerWrapper>
        {!isLoading && !isFetching && (
          <>
            <FollowerList>
              {followings?.map((following) => (
                <FollowItem key={following._id}>
                  <UserSimpleInfo profile={following} type='follow' isLink={true} />
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
