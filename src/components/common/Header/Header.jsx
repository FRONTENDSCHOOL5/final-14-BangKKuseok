import React from 'react';
import {
  HeaderWrapper,
  HeaderUI,
  HeaderShadowUI,
  SearchBtn,
  HeaderH2,
  HeaderH3,
} from './HeaderStyle';
import { ReactComponent as BackIcon } from '../../../assets/icons/icon-arrow-left.svg';
import { ReactComponent as MoreIcon } from '../../../assets/icons/icon-more.svg';
import { ReactComponent as SearchIcon } from '../../../assets/icons/icon-search.svg';
import Button from '../Button/Button';
import RoundedInput from '../Input/RoundedInput';

export default function Header({ type }) {
  const UI = {
    profile: (
      <HeaderUI>
        <button>
          <BackIcon stroke='#fff' />
        </button>
        <button>
          <MoreIcon fill='#fff' stroke='#fff' />
        </button>
      </HeaderUI>
    ),
    search: (
      <HeaderShadowUI>
        <button>
          <BackIcon stroke='#000' />
        </button>
        <RoundedInput id='search' placeholder='계정을 검색하세요' />
      </HeaderShadowUI>
    ),
    feed: (
      <HeaderUI>
        <SearchBtn>
          <SearchIcon stroke='#000' />
        </SearchBtn>
      </HeaderUI>
    ),
    home: (
      <HeaderUI>
        <SearchBtn>
          <SearchIcon stroke='#fff' />
        </SearchBtn>
      </HeaderUI>
    ),
    imageSelect: (
      <HeaderUI>
        <button>
          <BackIcon stroke='#000' />
        </button>
        <HeaderH2>사진 선택</HeaderH2>
        <Button disabled='true' size='sm'>
          저장
        </Button>
      </HeaderUI>
    ),
    post: (
      <HeaderUI>
        <button>
          <BackIcon stroke='#000' />
        </button>
        <HeaderH3>애월읍 위니브 감귤농장</HeaderH3>
        <button>
          <MoreIcon fill='#000' stroke='#000' />
        </button>
      </HeaderUI>
    ),
  };
  return <HeaderWrapper>{UI[type]}</HeaderWrapper>;
}
