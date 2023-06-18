import React, { useCallback, useEffect, useState } from 'react';
import ProductBubble from '../ProductBubble/ProductBubble';
import BottomSheet from '../../common/BottomSheet/BottomSheet';
import { useRecoilValue } from 'recoil';
import { selectedProductsAtom } from '../../../atoms/post';
import ProductTag from '../ProductTag/ProductTag';
import { ImgBox, TagBox } from '../PostProductTag/PostProductTagStyle';
import { SPACES } from '../../../constants/spaces';
import { ModalSpaceList, PostTextWriteWrapper, SelectSpaceBtn } from './PostTextWriteStyle';

export default function PostTextWrite({ postImg, setIsBtnActive, setContent }) {
  //바텀시트 열기 변수
  const [isShow, setIsShow] = useState(false);
  //선택된 데이터
  const selectedItems = useRecoilValue(selectedProductsAtom);

  //공간과,게시글 내용
  const [space, setSpace] = useState('공간을 선택해주세요');
  const [detail, setDetail] = useState('');

  //공간목록 모달 열기
  const handleClickSpaces = () => {
    setIsShow(true);
  };

  //공간 선택하기
  const handleClickSpace = (e) => {
    setSpace(e.target.innerText);
    setIsShow(false);
  };

  //인풋의 변화감지해서 해당밸류넣기
  const handleChangeDetail = useCallback(
    (e) => {
      setDetail(e.target.value);
    },
    [setDetail],
  );

  //data content에 추가하기 및 data있을때 버튼 활성화
  useEffect(() => {
    if (space !== '공간을 선택해주세요' && detail !== '') {
      setIsBtnActive(true);
      setContent({ space, detail });
    } else {
      setIsBtnActive(false);
    }
  }, [space, detail, setIsBtnActive, setContent]);

  return (
    <>
      <PostTextWriteWrapper>
        <ImgBox>
          <img src={postImg} alt='게시글 이미지' />
          <TagBox>
            {selectedItems.map((item) => (
              <li key={item.id}>
                <ProductBubble data={item} />
                <ProductTag data={item} />
              </li>
            ))}
          </TagBox>
        </ImgBox>
        <SelectSpaceBtn type='button' onClick={handleClickSpaces} space={space}>
          {space}
        </SelectSpaceBtn>
        <textarea
          name='content'
          cols='40'
          rows='10'
          maxlenth='300'
          placeholder='어떤 사진인지 공간과 상품에 대해 소개해주세요'
          value={detail}
          onChange={handleChangeDetail}
        ></textarea>
      </PostTextWriteWrapper>
      {isShow && (
        <BottomSheet isShow={isShow} setIsShow={setIsShow}>
          <ModalSpaceList>
            <h3>공간을 선택해주세요</h3>
            <ul>
              {SPACES.map((space, index) => (
                <button type='button' key={index} onClick={handleClickSpace}>
                  {space}
                </button>
              ))}
            </ul>
          </ModalSpaceList>
        </BottomSheet>
      )}
    </>
  );
}
