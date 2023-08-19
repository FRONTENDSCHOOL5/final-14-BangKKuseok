import React from 'react';
import { HeaderWrapper, SearchBtn, HeaderH2, HeaderSpan } from './HeaderStyle';
import { ReactComponent as BackIcon } from '../../../assets/icons/icon-arrow-left.svg';
import { ReactComponent as MoreIcon } from '../../../assets/icons/icon-more.svg';
import { ReactComponent as SearchIcon } from '../../../assets/icons/icon-search.svg';
import Button from '../Button/Button/Button';
import RoundedInput from '../Input/RoundedInput/RoundedInput';
import { useNavigate } from 'react-router-dom';

function BackButton({ type, onClick }) {
  const navigate = useNavigate();
  return (
    <button onClick={type === 'search' ? onClick : () => navigate(-1)}>
      <BackIcon stroke={type === 'profile' ? '#fff' : '#000'} />
    </button>
  );
}

function SearchButton({ type, onClick }) {
  return (
    <SearchBtn onClick={onClick}>
      <SearchIcon stroke={type === 'home' ? '#fff' : '#000'} />
    </SearchBtn>
  );
}

function MoreButton({ type, onClick }) {
  return (
    <button type='button' onClick={onClick}>
      <MoreIcon
        fill={type === 'profile' ? '#fff' : '#000'}
        stroke={type === 'profile' ? '#fff' : '#000'}
      />
    </button>
  );
}

function SaveButton({ onClick, btnText, isBtnActive }) {
  return (
    <Button disabled={!isBtnActive} size='sm' onClick={onClick}>
      {btnText}
    </Button>
  );
}

function HeaderTitle({ type, onClickTitle, title, subtitle }) {
  return (
    <HeaderH2 onClick={type === 'post' ? onClickTitle : null}>
      {title}
      {type === 'post' ? <HeaderSpan>{subtitle}</HeaderSpan> : null}
    </HeaderH2>
  );
}

export default function Header({
  type,
  title,
  subtitle,
  btnText,
  isBtnActive,
  onClickLeftButton,
  onClickRightButton,
  value,
  onChange,
  onClickTitle,
}) {
  switch (type) {
    case 'home':
      return (
        <HeaderWrapper type={type}>
          <SearchButton type={type} onClick={onClickRightButton} />
        </HeaderWrapper>
      );
    case 'feed':
      return (
        <HeaderWrapper type={type}>
          <BackButton type={type} onClick={onClickLeftButton} />
          <HeaderTitle type={type} onClickTitle={onClickTitle} title={title} />
          <SearchButton type={type} onClick={onClickRightButton} />
        </HeaderWrapper>
      );
    case 'search':
      return (
        <HeaderWrapper type={type}>
          <BackButton type={type} onClick={onClickLeftButton} />
          <RoundedInput
            id='search'
            placeholder='계정을 검색하세요'
            value={value}
            onChange={onChange}
          />
        </HeaderWrapper>
      );
    case 'profile':
      return (
        <HeaderWrapper type={type}>
          <BackButton type={type} onClick={onClickLeftButton} />
          <MoreButton type={type} onClick={onClickRightButton} />
        </HeaderWrapper>
      );
    case 'profileEdit':
      return (
        <HeaderWrapper type={type}>
          <BackButton type={type} onClick={onClickLeftButton} />
          <HeaderTitle type={type} onClickTitle={onClickTitle} title={title} />
          <SaveButton onClick={onClickRightButton} btnText={btnText} isBtnActive={isBtnActive} />
        </HeaderWrapper>
      );
    case 'follow':
      return (
        <HeaderWrapper type={type}>
          <BackButton type={type} onClick={onClickLeftButton} />
          <HeaderTitle type={type} onClickTitle={onClickTitle} title={title} />
        </HeaderWrapper>
      );
    case 'post':
      return (
        <HeaderWrapper type={type}>
          <BackButton type={type} onClick={onClickLeftButton} />
          <HeaderTitle type={type} onClickTitle={onClickTitle} title={title} subtitle={subtitle} />
          <MoreButton type={type} onClick={onClickRightButton} />
        </HeaderWrapper>
      );
    case 'imageSelect':
      return (
        <HeaderWrapper type={type}>
          <BackButton type={type} onClick={onClickLeftButton} />
          <HeaderTitle type={type} onClickTitle={onClickTitle} title={title} />
          <SaveButton onClick={onClickRightButton} btnText={btnText} isBtnActive={isBtnActive} />
        </HeaderWrapper>
      );
    default:
      return null;
  }
}
