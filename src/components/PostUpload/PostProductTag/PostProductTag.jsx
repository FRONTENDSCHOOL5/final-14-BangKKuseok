import React, { useEffect, useState } from 'react';
import addTagBtn from '../../../assets/icons/icon-add-tag.svg';
import {
  GuideTagButton,
  BouncingCircle,
  ImgBox,
  PostProductTagWrapper,
  TagBox,
} from './PostProductTagStyle';
import ProductBubble from '../ProductBubble/ProductBubble';
import BottomSheet from '../../common/BottomSheet/BottomSheet';
import BasicModal from '../../common/BottomSheet/BasicModal';
import ModalProductList from '../ModalProductList/ModalProductList';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  canSelectProductSelector,
  mouseLocAtom,
  selectedProductsAtom,
  userProductsAtom,
} from '../../../atoms/post';
import ProductTag from '../ProductTag/ProductTag';
import useBubbleLocation from '../../../hooks/useBubbleLocation';
import { MOUSEBENCHMARK } from '../../../constants/common';
import { useQuery } from 'react-query';
import { getMyProfile } from '../../../api/profileApi';
import { getProducts } from '../../../api/productApi';

export default function PostProductTag({ postImg }) {
  //태그추가 단계 : 클릭 유도 / 상품목록 확인 / 태그와 버블 / 상품태그 추가
  const [tagStep, setTagStep] = useState('클릭 유도');
  const [isBubbleShow, setIsBubbleShow] = useState(true);
  const [isShow, setIsShow] = useState(false);
  const [isMouseMove, setIsMouseMove] = useState(false);
  const [mouseLoc, setMouseLoc] = useRecoilState(mouseLocAtom);
  const selectedItems = useRecoilValue(selectedProductsAtom);
  const setUserItems = useSetRecoilState(userProductsAtom);
  const canSeletedItems = useRecoilValue(canSelectProductSelector);
  const { xLeftBenchmark, xRightBenchmark, yLeftBenchmark, yRightBenchmark } = MOUSEBENCHMARK;

  const { data: myProfileData } = useQuery('myProfile', getMyProfile);
  // 상품 목록 정보 가져오기
  const { data: myProductData } = useQuery(
    ['myProduct', myProfileData],
    () => getProducts(myProfileData.accountname),
    {
      enabled: !!myProfileData,
      onSuccess(data) {
        setUserItems(data);
      },
    },
  );

  useEffect(() => {
    if (selectedItems.length > 0) {
      setTagStep('태그와 버블');
    }
  }, []);

  const handleMouseMoveOnImg = (e) => {
    if (!isMouseMove) return;
    if ((isMouseMove && tagStep === '클릭 유도') || tagStep === '상품태그 추가') {
      const x = Math.floor((e.nativeEvent.offsetX / e.currentTarget.offsetWidth) * 100);
      const y = Math.floor((e.nativeEvent.offsetY / e.currentTarget.offsetWidth) * 100);
      setMouseLoc({
        x: x < xLeftBenchmark ? xLeftBenchmark : x > xRightBenchmark ? xRightBenchmark : x,
        y: y < yLeftBenchmark ? yLeftBenchmark : y > yRightBenchmark ? yRightBenchmark : y,
      });
    }
  };

  const handleMouseUpImg = (e) => {
    //1.태그 선택이 가능할 때
    if (tagStep === '클릭 유도' || tagStep === '상품태그 추가') {
      setIsMouseMove(false);
      setIsShow(true);
      setTagStep('상품목록 확인');

      //2.'태그와 버블'일때
    } else if (tagStep === '태그와 버블' && canSeletedItems.length > 0) {
      setIsBubbleShow(false);
      setTagStep('상품태그 추가');
    }
  };

  useBubbleLocation();

  useEffect(() => {
    if (tagStep === '상품목록 확인' && !isShow) {
      setMouseLoc({ x: 50, y: 50 });
      setIsMouseMove(false);
      if (selectedItems.length === 0) {
        setTagStep('클릭 유도');
      } else {
        setTagStep('태그와 버블');
      }
    }
  }, [isMouseMove, isShow, selectedItems, setMouseLoc, tagStep]);

  const handleClickModalOpen = () => {
    setIsShow((prev) => !prev);
  };

  return (
    <>
      <PostProductTagWrapper>
        <ImgBox>
          <img src={postImg} alt='게시글 이미지' />
          <TagBox
            onMouseDown={() => setIsMouseMove(true)}
            onMouseMove={handleMouseMoveOnImg}
            onMouseUp={handleMouseUpImg}
            isPointer={tagStep === '클릭 유도' || tagStep === '상품태그 추가'}
          >
            {tagStep === '클릭 유도' && (
              <>
                <GuideTagButton addTagBtn={addTagBtn} mouseLoc={mouseLoc} />
                {!isMouseMove && <BouncingCircle mouseLoc={mouseLoc} />}
              </>
            )}
            {(tagStep === '태그와 버블' || tagStep === '상품태그 추가') &&
              selectedItems.map((item) => (
                <li key={item.id}>
                  <ProductBubble
                    data={item}
                    setTagStep={setTagStep}
                    isBubbleShow={isBubbleShow}
                    setIsMouseMove={setIsMouseMove}
                  />
                  <ProductTag data={item} />
                </li>
              ))}
          </TagBox>
        </ImgBox>
        <p>
          {tagStep === '태그와 버블'
            ? canSeletedItems.length > 0
              ? '다른 상품들도 태그할 수 있어요'
              : ''
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
