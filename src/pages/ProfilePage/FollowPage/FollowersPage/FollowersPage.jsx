import React from 'react';
import BasicLayout from '../../../../layout/BasicLayout';
import { useNavigate } from 'react-router-dom';
import UserSimpleInfo from '../../../../components/common/UserSimpleInfo/UserSimpleInfo/UserSimpleInfo';
import { profile } from '../../../../mock/mockData';
import { FollowerWrapper, FollowerList, FollowItem } from './FollowersPageStyle';

export default function Followers() {
  const navigate = useNavigate();

  const handleClickBackButton = () => {
    navigate(-1);
  };

  return (
    <BasicLayout type='follow' title='팔로워' onClickLeftButton={handleClickBackButton}>
      <FollowerWrapper>
        <FollowerList>
          <FollowItem>
            <UserSimpleInfo profile={profile[0]} type='follow' isLink={true} />
          </FollowItem>
          <FollowItem>
            <UserSimpleInfo profile={profile[0]} type='follow' isLink={true} />
          </FollowItem>
        </FollowerList>
      </FollowerWrapper>
    </BasicLayout>
  );
}
