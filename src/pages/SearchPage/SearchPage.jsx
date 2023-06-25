import React, { useState } from 'react';
import BasicLayout from '../../layout/BasicLayout';
import UserSimpleInfo from '../../components/common/UserSimpleInfo/UserSimpleInfo/UserSimpleInfo';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import { getSearchResult } from '../../api/searchApi';
import Skeleton from '../../components/common/UserSimpleInfo/Skeleton/Skeleton';

const UserInfoList = styled.ul`
  padding: 16px;

  li {
    margin-bottom: 16px;
  }
`;

const Message = styled.p`
  font-weight: 500;
  font-size: ${({ theme }) => theme.fontSize.base};
  color: ${({ theme }) => theme.colors.gray200};
  padding-top: 52px;
  text-align: center;
`;

export default function Search({ onClickLeftButton }) {
  const [inputValue, setInputValue] = useState('');

  const { data: searchResult, isFetching } = useQuery(
    ['searchUser', inputValue],
    () => getSearchResult(inputValue),
    {
      enabled: !!inputValue,
      select: (result) =>
        result.filter((user) => {
          return user.username.includes(inputValue);
        }),
    },
  );

  const handleChangeInput = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <BasicLayout
      type='search'
      onClickLeftButton={onClickLeftButton}
      value={inputValue}
      onChange={handleChangeInput}
    >
      <UserInfoList>
        {inputValue &&
          (searchResult?.length >= 1 ? (
            <>
              {searchResult.map((profile) => (
                <li key={profile._id}>
                  <UserSimpleInfo profile={profile} isLink={true} />
                </li>
              ))}
            </>
          ) : (
            isFetching && (
              <>
                {Array(10)
                  .fill()
                  .map((_, idx) => (
                    <li key={idx}>
                      <Skeleton />
                    </li>
                  ))}
              </>
            )
          ))}
      </UserInfoList>
    </BasicLayout>
  );
}
