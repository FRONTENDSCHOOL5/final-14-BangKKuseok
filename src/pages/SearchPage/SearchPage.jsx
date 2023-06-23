import React, { useState } from 'react';
import BasicLayout from '../../layout/BasicLayout';
import UserSimpleInfo from '../../components/common/UserSimpleInfo/UserSimpleInfo/UserSimpleInfo';
import { profile } from '../../mock/mockData';
import styled from 'styled-components';
import Skeleton from '../../components/common/UserSimpleInfo/Skeleton/Skeleton';

const UserInfoList = styled.ul`
  padding: 16px;

  li {
    margin-bottom: 16px;
  }
`;

export default function Search({ onClickLeftButton }) {
  const [search, setSearch] = useState('');

  const handleChangeInput = (e) => {
    setSearch(e.target.value);
  };

  const filterProfile = profile.filter((p) => {
    return p.username.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <BasicLayout
      type='search'
      onClickLeftButton={onClickLeftButton}
      value={search}
      onChange={handleChangeInput}
    >
      <UserInfoList>
        {search &&
          (filterProfile.length >= 1 ? (
            <>
              {filterProfile.map((profile) => (
                <li key={profile._id}>
                  <UserSimpleInfo profile={profile} isLink={true} />
                </li>
              ))}
            </>
          ) : (
            <>
              {profile.map((profile) => (
                <li key={profile._id}>
                  <Skeleton />
                </li>
              ))}
            </>
          ))}
      </UserInfoList>
    </BasicLayout>
  );
}
