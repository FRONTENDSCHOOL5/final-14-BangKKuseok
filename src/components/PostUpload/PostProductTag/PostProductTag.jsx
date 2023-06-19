import React, { useEffect, useState } from 'react';
import addTagBtn from '../../../assets/icons/icon-add-tag.svg';
import { BouncingCircle, ImgBox, PostProductTagWrapper, TagBox } from './PostProductTagStyle';
import ProductBubble from '../ProductBubble/ProductBubble';
import BottomSheet from '../../common/BottomSheet/BottomSheet';
import BasicModal from '../../common/BottomSheet/BasicModal';
import ModalProductList from '../ModalProductList/ModalProductList';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  bubbleLocAtom,
  mouseLocAtom,
  selectedProductsAtom,
  userProductsAtom,
} from '../../../atoms/post';
import ProductTag from '../ProductTag/ProductTag';

export default function PostProductTag({ postedImg, setIsBtnActive }) {
  //태그추가 단계 : 클릭 유도 / 상품목록 확인 / 태그와 버블 / 상품태그 추가
  const [tagStep, setTagStep] = useState('클릭 유도');

  const [isBubbleShow, setIsBubbleShow] = useState(true);
  const [isShow, setIsShow] = useState(false);

  //마우스, 말풍선 위칫값
  const [mouseLoc, setMouseLoc] = useRecoilState(mouseLocAtom);
  const setBubbleLoc = useSetRecoilState(bubbleLocAtom);

  //선택된 데이터
  const selectedItems = useRecoilValue(selectedProductsAtom);
  const userItems = useRecoilValue(userProductsAtom);

  //이미지 위 클릭하면
  const handleClickImg = (e) => {
    //1.'클릭 유도'일때
    if ((tagStep === '클릭 유도' || tagStep === '상품태그 추가') && e.target === e.currentTarget) {
      // 마우스 위치 지정
      const x = Math.floor((e.nativeEvent.offsetX / e.currentTarget.offsetWidth) * 100);
      const y = Math.floor((e.nativeEvent.offsetY / e.currentTarget.offsetWidth) * 100);
      setMouseLoc({
        x: x < 6 ? 6 : x > 94 ? 94 : x,
        y: y < 5 ? 5 : y > 95 ? 95 : y,
      });

      //바텀시트 열고 tagStep 바꾸기
      setIsShow(true);
      setTagStep('상품목록 확인');

      //2.'태그와 버블'일때
    } else if (tagStep === '태그와 버블') {
      setIsBubbleShow(false);
      setTagStep('상품태그 추가');
    }
  };

  //마우스 위치에 따른 말풍선 위치
  useEffect(() => {
    let eLeft = 50;
    if (mouseLoc.x > 67) {
      eLeft = 51.5 + (mouseLoc.x - 68) * 1.63;
    } else if (mouseLoc.x < 33) {
      eLeft = 6 + (mouseLoc.x - 6) * 1.59;
    } else {
      eLeft = 50;
    }
    if (mouseLoc.y < 28) {
      eLeft = eLeft - 2.5;
    }
    setBubbleLoc({
      x: mouseLoc.x < 33 ? 33 : mouseLoc.x > 67 ? 67 : mouseLoc.x,
      y: mouseLoc.y > 28 ? mouseLoc.y - 7 : mouseLoc.y + 27,
      bubbleUp: mouseLoc.y > 28,
      edgeLeft: eLeft,
    });
  }, [mouseLoc, setBubbleLoc]);

  //상품선택 안하고 모달 닫았을 때 돌아가기
  useEffect(() => {
    if (tagStep === '상품목록 확인' && selectedItems.length === 0 && !isShow) {
      setTagStep('클릭 유도');
    }
  }, [isShow, selectedItems, setIsBtnActive, tagStep]);

  //선택상품이 있거나 아예 판매상품이 없을때 다음단계로 넘어갈 수 있다
  useEffect(() => {
    if (userItems.length === 0 || selectedItems.length >= 1) {
      setIsBtnActive(true);
    } else {
      setIsBtnActive(false);
    }
  }, [selectedItems, setIsBtnActive, userItems]);

  //바텀시트 여닫기
  const handleClickModalOpen = () => {
    setIsShow((prev) => !prev);
  };

  return (
    <>
      <PostProductTagWrapper>
        <ImgBox>
          <img src={postedImg} alt='게시글 이미지' />
          <TagBox onClick={handleClickImg}>
            {tagStep === '클릭 유도' && (
              <>
                <img src={addTagBtn} alt='상품 태그 버튼' />
                <BouncingCircle />
              </>
            )}
            {(tagStep === '태그와 버블' || tagStep === '상품태그 추가') &&
              selectedItems.map((item) => (
                <li key={item.id}>
                  <ProductBubble data={item} setTagStep={setTagStep} isBubbleShow={isBubbleShow} />
                  <ProductTag data={item} />
                </li>
              ))}
          </TagBox>
        </ImgBox>
        <p>
          {tagStep === '태그와 버블'
            ? '다른 상품들도 태그할 수 있어요'
            : '원하는 위치에 회원님의 상품을 태그하세요'}
        </p>
      </PostProductTagWrapper>
      {tagStep === '상품목록 확인' && (
        <BottomSheet isShow={isShow} onClick={handleClickModalOpen}>
          <BasicModal>
            <ModalProductList
              setIsShow={setIsShow}
              setTagStep={setTagStep}
              setIsBubbleShow={setIsBubbleShow}
            />
          </BasicModal>
        </BottomSheet>
      )}
    </>
  );
}
