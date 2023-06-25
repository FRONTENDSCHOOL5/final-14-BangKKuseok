import React, { useCallback, useEffect, useState } from 'react';
import BasicLayout from '../../layout/BasicLayout';
import UserSimpleInfo from '../../components/common/UserSimpleInfo/UserSimpleInfo/UserSimpleInfo';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import { getSearchResult } from '../../api/searchApi';
import Skeleton from '../../components/common/UserSimpleInfo/Skeleton/Skeleton';
import useDebounce from '../../hooks/useDebounce';

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
  const { debouncedValue: debouncedSearchUser, cancel } = useDebounce(inputValue, 500);
  const [initialSearchResult, setInitialSearchResult] = useState(null);

  useEffect(() => {
    const savedSearchResult = localStorage.getItem('searchResult');
    if (savedSearchResult) {
      setInitialSearchResult(JSON.parse(savedSearchResult));
    }
  }, []);

  const { data: searchResult, isFetching } = useQuery(
    ['searchUser', debouncedSearchUser],
    () => getSearchResult(debouncedSearchUser),
    {
      enabled: !!debouncedSearchUser,
      select: (result) =>
        result.filter((user) => {
          return user.username.includes(debouncedSearchUser);
        }),
    },
  );

  const handleChangeInput = (e) => {
    setInputValue(e.target.value);
    if (inputValue === '') {
      cancel(); // inputValue를 모두 지웠을 때 debounce값도 초기화
    }
  };

  const handleSaveSearchResult = useCallback((user) => {
    const savedSearchResult = localStorage.getItem('searchResult');
    let searchResults = savedSearchResult ? JSON.parse(savedSearchResult) : [];

    const existingUser = searchResults.find((savedUser) => savedUser._id === user._id);
    if (!existingUser) {
      searchResults = [...searchResults, user];
      localStorage.setItem('searchResult', JSON.stringify(searchResults));
    }
  }, []);

  // const handleChangeTextColor = () => {

  // }

  return (
    <BasicLayout
      type='search'
      onClickLeftButton={onClickLeftButton}
      value={inputValue}
      onChange={handleChangeInput}
    >
      <UserInfoList>
        {!inputValue && initialSearchResult ? (
          initialSearchResult.map((user) => (
            <li key={user._id} onClick={() => handleSaveSearchResult(user)}>
              <UserSimpleInfo profile={user} isLink={true} />
            </li>
          ))
        ) : isFetching ? (
          <>
            {Array(10)
              .fill()
              .map((_, idx) => (
                <li key={idx}>
                  <Skeleton />
                </li>
              ))}
          </>
        ) : inputValue && debouncedSearchUser && searchResult?.length > 0 ? (
          searchResult.map((user) => (
            <li key={user._id} onClick={() => handleSaveSearchResult(user)}>
              <UserSimpleInfo profile={user} isLink={true} inputValue={inputValue} />
            </li>
          ))
        ) : (
          inputValue && <Message>일치하는 유저가 없습니다.</Message>
        )}
      </UserInfoList>
    </BasicLayout>
  );
}
