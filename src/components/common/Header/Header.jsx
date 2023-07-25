import React from 'react';
import { HeaderWrapper, SearchBtn, HeaderH2, HeaderSpan } from './HeaderStyle';
import { ReactComponent as BackIcon } from '../../../assets/icons/icon-arrow-left.svg';
import { ReactComponent as MoreIcon } from '../../../assets/icons/icon-more.svg';
import { ReactComponent as SearchIcon } from '../../../assets/icons/icon-search.svg';
import Button from '../Button/Button/Button';
import RoundedInput from '../Input/RoundedInput/RoundedInput';
import { useNavigate } from 'react-router-dom';

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
  let leftButton;
  let centerContent;
  let rightButton;

  const navigate = useNavigate();

  const backButton = (
    <button onClick={type === 'search' ? onClickLeftButton : () => navigate(-1)}>
      <BackIcon stroke={type === 'profile' ? '#fff' : '#000'} />
    </button>
  );

  const searchButton = (
    <SearchBtn onClick={onClickRightButton}>
      <SearchIcon stroke={type === 'home' ? '#fff' : '#000'} />
    </SearchBtn>
  );

  const moreButton = (
    <button type='button' onClick={onClickRightButton}>
      <MoreIcon
        fill={type === 'profile' ? '#fff' : '#000'}
        stroke={type === 'profile' ? '#fff' : '#000'}
      />
    </button>
  );

  const saveButton = (
    <Button disabled={!isBtnActive} size='sm' onClick={onClickRightButton}>
      {btnText}
    </Button>
  );

  const headerTitle = (
    <HeaderH2 onClick={type === 'post' ? onClickTitle : null}>
      {title}
      {type === 'post' ? <HeaderSpan>{subtitle}</HeaderSpan> : null}
    </HeaderH2>
  );

  switch (type) {
    case 'home':
      rightButton = searchButton;
      break;
    case 'feed':
      leftButton = backButton;
      centerContent = <HeaderH2>{title}</HeaderH2>;
      rightButton = searchButton;
      break;
    case 'search':
      leftButton = backButton;
      centerContent = (
        <RoundedInput
          id='search'
          placeholder='계정을 검색하세요'
          value={value}
          onChange={onChange}
        />
      );
      break;
    case 'profile':
      leftButton = backButton;
      rightButton = moreButton;
      break;
    case 'profileEdit':
      leftButton = backButton;
      centerContent = headerTitle;
      rightButton = saveButton;
      break;
    case 'follow':
      leftButton = backButton;
      centerContent = headerTitle;
      break;
    case 'post':
      leftButton = backButton;
      centerContent = headerTitle;
      rightButton = moreButton;
      break;
    case 'imageSelect':
      leftButton = backButton;
      centerContent = headerTitle;
      rightButton = saveButton;
      break;
    default:
      return null;
  }
  return (
    <HeaderWrapper type={type}>
      {leftButton}
      {centerContent}
      {rightButton}
    </HeaderWrapper>
  );
}
