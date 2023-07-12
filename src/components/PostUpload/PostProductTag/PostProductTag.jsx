import React, { useEffect, useState } from 'react';
import addTagBtn from '../../../assets/icons/icon-add-tag.svg';
import { BouncingCircle, ImgBox, PostProductTagWrapper, TagBox } from './PostProductTagStyle';
import ProductBubble from '../ProductBubble/ProductBubble';
import BottomSheet from '../../common/BottomSheet/BottomSheet';
import BasicModal from '../../common/BottomSheet/BasicModal';
import ModalProductList from '../ModalProductList/ModalProductList';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  mouseLocAtom,
  selectedProductsAtom,
  userProductsAtom,
} from '../../../atoms/post';
import ProductTag from '../ProductTag/ProductTag';
import useBubbleLocation from '../../../hooks/useBubbleLocation';
import { MOUSEBENCHMARK } from '../../../constants/common';

export default function PostProductTag({ postedImg, setIsBtnActive }) {
  //태그추가 단계 : 클릭 유도 / 상품목록 확인 / 태그와 버블 / 상품태그 추가
  const [tagStep, setTagStep] = useState('클릭 유도');
  const [isBubbleShow, setIsBubbleShow] = useState(true);
  const [isShow, setIsShow] = useState(false);
  const selectedItems = useRecoilValue(selectedProductsAtom);
  const userItems = useRecoilValue(userProductsAtom);
  const { xLeftBenchmark, xRightBenchmark, yLeftBenchmark, yRightBenchmark } = MOUSEBENCHMARK;

  useEffect(() => {
    if (selectedItems.length > 0) {
      setTagStep('태그와 버블');
    }
  }, []);

  const handleClickImg = (e) => {
    //1.'클릭 유도'일때
    if ((tagStep === '클릭 유도' || tagStep === '상품태그 추가') && e.target === e.currentTarget) {
      const x = Math.floor((e.nativeEvent.offsetX / e.currentTarget.offsetWidth) * 100);
      const y = Math.floor((e.nativeEvent.offsetY / e.currentTarget.offsetWidth) * 100);
      setMouseLoc({
        x: x < xLeftBenchmark ? xLeftBenchmark : x > xRightBenchmark ? xRightBenchmark : x,
        y: y < yLeftBenchmark ? yLeftBenchmark : y > yRightBenchmark ? yRightBenchmark : y,
      });

      setIsShow(true);
      setTagStep('상품목록 확인');

      //2.'태그와 버블'일때
    } else if (tagStep === '태그와 버블') {
      setIsBubbleShow(false);
      setTagStep('상품태그 추가');
    }
  };

  useBubbleLocation();

  useEffect(() => {
    if (tagStep === '상품목록 확인' && selectedItems.length === 0 && !isShow) {
      setTagStep('클릭 유도');
    }
  }, [isShow, selectedItems, setIsBtnActive, tagStep]);

  useEffect(() => {
    if (userItems.length === 0 || selectedItems.length >= 1) {
      setIsBtnActive(true);
    } else {
      setIsBtnActive(false);
    }
  }, [selectedItems, setIsBtnActive, userItems]);

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
