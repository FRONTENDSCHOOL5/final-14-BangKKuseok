import React from 'react';
import BasicLayout from '../../../../layout/BasicLayout';
import { useLocation } from 'react-router-dom';
import { FollowerWrapper, FollowerList, FollowItem } from './FollowersPageStyle';
import { getFollowers } from '../../../../api/followApi';
import UserSimpleInfo from '../../../../components/common/UserSimpleInfo/UserSimpleInfo/UserSimpleInfo';
import useObserver from '../../../../hooks/useObserver';
import useInfiniteDataQuery from '../../../../hooks/useInfiniteDataQuery';
import { useRecoilValue } from 'recoil';
import { myProfileDataAtom } from '../../../../atoms/myProfile';
import { FOLLOWLIMIT } from '../../../../constants/pagenation';

export default function FollowersPage() {
  const accountname = useLocation().state.accountname;

  const myProfileData = useRecoilValue(myProfileDataAtom);

  const {
    data: followers,
    fetchNextPage,
    isLoading,
    hasNextPage,
  } = useInfiniteDataQuery(['followers', accountname], getFollowers, {
    limit: FOLLOWLIMIT,
    select: (data) => {
      return data.pages.flatMap((page) => page.data);
    },
    enabled: !!accountname,
  });

  const observerRef = useObserver(hasNextPage, fetchNextPage, isLoading);

  return (
    <BasicLayout type='follow' title='팔로워'>
      <FollowerWrapper>
        <FollowerList>
          {followers?.map((follower) => (
            <FollowItem key={follower._id}>
              <UserSimpleInfo
                profile={follower}
                type='follow'
                isLink={true}
                isMyProfile={myProfileData.accountname === follower.accountname}
              />
            </FollowItem>
          ))}
        </FollowerList>
        <div ref={observerRef} style={{ minHeight: '1px' }}></div>
      </FollowerWrapper>
    </BasicLayout>
  );
}
