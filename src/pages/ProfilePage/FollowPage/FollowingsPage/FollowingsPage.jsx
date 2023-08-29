import React from 'react';
import BasicLayout from '../../../../layout/BasicLayout';
import { useLocation } from 'react-router-dom';
import { FollowerWrapper, FollowerList, FollowItem } from '../FollowersPage/FollowersPageStyle';
import { getFollowings } from '../../../../api/followApi';
import UserSimpleInfo from '../../../../components/common/UserSimpleInfo/UserSimpleInfo/UserSimpleInfo';
import useObserver from '../../../../hooks/useObserver';
import useInfiniteDataQuery from '../../../../hooks/useInfiniteDataQuery';
import { useRecoilValue } from 'recoil';
import { myProfileDataAtom } from '../../../../atoms/myProfile';
import { FOLLOWLIMIT } from '../../../../constants/pagenation';

export default function FollowingsPage() {
  const accountname = useLocation().state.accountname;

  const myProfileData = useRecoilValue(myProfileDataAtom);

  const {
    data: followings,
    fetchNextPage,
    isLoading,
    hasNextPage,
  } = useInfiniteDataQuery(['followings', accountname], getFollowings, {
    limit: FOLLOWLIMIT,
    select: (data) => {
      return data.pages.flatMap((page) => page.data);
    },
    enabled: !!accountname,
  });

  const observerRef = useObserver(hasNextPage, fetchNextPage, isLoading);

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
