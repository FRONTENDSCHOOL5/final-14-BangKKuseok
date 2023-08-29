import React, { useEffect, useState } from 'react';
import addTagBtn from '../../../assets/icons/icon-add-tag.svg';
import {
  GuideTagButton,
  BouncingCircle,
  ImgBox,
  PostProductTagWrapper,
  TagBox,
} from './PostProductTagStyle';
import BottomSheet from '../../common/BottomSheet/BottomSheet';
import BasicModal from '../../common/BottomSheet/BasicModal';
import ModalProductList from '../ModalProductList/ModalProductList';
import { useRecoilValue } from 'recoil';
import { myProfileDataAtom } from '../../../atoms/myProfile';
import useBubbleLocation from '../../../hooks/useBubbleLocation';
import { MOUSEBENCHMARK } from '../../../constants/common';
import { useQuery } from 'react-query';
import { getProducts } from '../../../api/productApi';
import useModal from '../../../hooks/useModal';
import ProductTagItem from '../ProductTagItem/ProductTagItem';

export default function PostProductTag({
  postImg,
  selectedProducts,
  setSelectedProducts,
  type = 'upload',
}) {
  //태그추가 단계 : 클릭 유도 / 상품목록 확인 / 태그와 버블 / 상품태그 추가
  const [tagStep, setTagStep] = useState('클릭 유도');
  const [isBubbleShow, setIsBubbleShow] = useState(true);
  const [isMouseMove, setIsMouseMove] = useState(false);

  const myProfileData = useRecoilValue(myProfileDataAtom);
  const [pinLoc, setPinLoc] = useState({ x: 50, y: 50 });
  const [canSelectProducts, setCanSelectProducts] = useState([]);

  const { xLeftBenchmark, xRightBenchmark, yLeftBenchmark, yRightBenchmark } = MOUSEBENCHMARK;

  const { modalData, openModal } = useModal('');

  // 상품 목록 정보 가져오기
  const { data: myProductData } = useQuery(
    ['myProduct', myProfileData],
    () => getProducts(myProfileData.accountname),
    {
      onSuccess(data) {
        setCanSelectProducts(data);
      },
    },
  );

  //선택 가능 상품 목록 필터링
  useEffect(() => {
    const filter = selectedProducts.map((product) => product.id);
    setCanSelectProducts((products) => products.filter((product) => !filter.includes(product.id)));
  }, [selectedProducts]);

  useEffect(() => {
    if (selectedProducts.length > 0 || type === 'edit') {
      setTagStep('태그와 버블');
    }
  }, []);

  const handleSetPinLocation = (e) => {
    const x = Math.floor((e.nativeEvent.offsetX / e.currentTarget.offsetWidth) * 100);
    const y = Math.floor((e.nativeEvent.offsetY / e.currentTarget.offsetWidth) * 100);
    setPinLoc({
      x: x < xLeftBenchmark ? xLeftBenchmark : x > xRightBenchmark ? xRightBenchmark : x,
      y: y < yLeftBenchmark ? yLeftBenchmark : y > yRightBenchmark ? yRightBenchmark : y,
    });
  };

  const handleMouseMoveOnImg = (e) => {
    if (!isMouseMove) return;
    if ((isMouseMove && tagStep === '클릭 유도') || tagStep === '상품태그 추가') {
      handleSetPinLocation(e);
    }
  };
  const bubbleLoc = useBubbleLocation(pinLoc);

  const handleMouseUpImg = (e) => {
    e.stopPropagation();
    //1.태그 선택이 가능할 때
    if (tagStep === '클릭 유도' || tagStep === '상품태그 추가') {
      handleSetPinLocation(e);
      setIsMouseMove(false);
      openModal('productList');
      setTagStep('상품목록 확인');

      //2.'태그와 버블'일때
    } else if (tagStep === '태그와 버블') {
      setIsBubbleShow(false);
      setTagStep('상품태그 추가');
    }
  };

  useEffect(() => {
    if (tagStep === '상품목록 확인' && !modalData.isShow) {
      setPinLoc({ x: 50, y: 50 });
      setIsMouseMove(false);
      if (selectedProducts.length === 0) {
        setTagStep('클릭 유도');
      } else {
        setTagStep('태그와 버블');
      }
    }
  }, [isMouseMove, modalData.isShow, selectedProducts, setPinLoc, tagStep]);

  return (
    <>
      <PostProductTagWrapper type={type}>
        <ImgBox>
          {type === 'upload' && <img src={postImg} alt='게시글 이미지' />}
          <TagBox
            onMouseDown={() => setIsMouseMove(true)}
            onMouseMove={handleMouseMoveOnImg}
            onMouseUp={handleMouseUpImg}
            isPointer={tagStep === '클릭 유도' || tagStep === '상품태그 추가'}
          >
            {tagStep === '클릭 유도' && (
              <>
                <GuideTagButton addTagBtn={addTagBtn} pinLoc={pinLoc} />
                {!isMouseMove && <BouncingCircle pinLoc={pinLoc} />}
              </>
            )}
            {(tagStep === '태그와 버블' || tagStep === '상품태그 추가') &&
              selectedProducts.map((item) => (
                <ProductTagItem
                  key={item.id}
                  data={item}
                  setTagStep={setTagStep}
                  isBubbleShow={isBubbleShow}
                  setIsMouseMove={setIsMouseMove}
                  setPinLoc={setPinLoc}
                  selectedProducts={selectedProducts}
                  setSelectedProducts={setSelectedProducts}
                  canSelectProducts={canSelectProducts}
                  setCanSelectProducts={setCanSelectProducts}
                  type={type}
                />
              ))}
          </TagBox>
        </ImgBox>
        {type === 'upload' && (
          <p>
            {tagStep === '태그와 버블'
              ? canSelectProducts.length > 0
                ? '다른 상품들도 태그할 수 있어요'
                : ''
              : '원하는 위치에 회원님의 상품을 태그하세요'}
          </p>
        )}
      </PostProductTagWrapper>
      {tagStep === '상품목록 확인' && (
        <BottomSheet>
          <BasicModal>
            <ModalProductList
              setTagStep={setTagStep}
              setIsBubbleShow={setIsBubbleShow}
              pinLoc={pinLoc}
              bubbleLoc={bubbleLoc}
              setSelectedProducts={setSelectedProducts}
              canSelectProducts={canSelectProducts}
            />
          </BasicModal>
        </BottomSheet>
      )}
    </>
  );
}
