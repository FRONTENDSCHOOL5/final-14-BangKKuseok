import React from 'react';
import BasicLayout from '../../../../layout/BasicLayout';
import { useLocation, useNavigate } from 'react-router-dom';
import { FollowerWrapper, FollowerList, FollowItem } from './FollowersPageStyle';
import { useInfiniteQuery } from 'react-query';
import { getFollowers } from '../../../../api/followApi';
import UserSimpleInfo from '../../../../components/common/UserSimpleInfo/UserSimpleInfo/UserSimpleInfo';
import useObserver from '../../../../hooks/useObserver';
import { useRecoilValue } from 'recoil';
import { myProfileDataAtom } from '../../../../atoms/myProfile';

export default function FollowersPage() {
  const navigate = useNavigate();
  const accountname = useLocation().state.accountname;

  const myProfileData = useRecoilValue(myProfileDataAtom);

  const {
    data: followers,
    fetchNextPage,
    isLoading,
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

  const handleClickBackButton = () => {
    navigate(-1);
  };

  return (
    <BasicLayout type='follow' title='팔로워' onClickLeftButton={handleClickBackButton}>
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
