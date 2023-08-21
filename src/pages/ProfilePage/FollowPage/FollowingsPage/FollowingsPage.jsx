import React from 'react';
import BasicLayout from '../../../../layout/BasicLayout';
import { useLocation } from 'react-router-dom';
import { FollowerWrapper, FollowerList, FollowItem } from '../FollowersPage/FollowersPageStyle';
import { useInfiniteQuery } from 'react-query';
import { getFollowings } from '../../../../api/followApi';
import UserSimpleInfo from '../../../../components/common/UserSimpleInfo/UserSimpleInfo/UserSimpleInfo';
import useObserver from '../../../../hooks/useObserver';
import { useRecoilValue } from 'recoil';
import { myProfileDataAtom } from '../../../../atoms/myProfile';

export default function FollowingsPage() {
  const accountname = useLocation().state.accountname;

  const myProfileData = useRecoilValue(myProfileDataAtom);

  const {
    data: followings,
    fetchNextPage,
    isLoading,
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

  const { data: myProfileData } = useQuery('myProfile', getMyProfile);

  return (
    <BasicLayout type='follow' title='팔로잉'>
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
                />
              </FollowItem>
            ))}
          </FollowerList>
        </>
        <div ref={observerRef} style={{ minHeight: '1px' }}></div>
      </FollowerWrapper>
    </BasicLayout>
  );
}
