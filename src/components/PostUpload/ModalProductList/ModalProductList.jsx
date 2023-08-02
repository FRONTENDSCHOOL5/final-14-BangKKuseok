import React from 'react';
import ModalProductItem from '../ModalProductItem/ModalProductItem';
import Button from '../../common/Button/Button/Button';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { canSelectProductSelector } from '../../../atoms/post';
import { ModalProductListWrapper } from './ModalProductListStyle';

export default function ModalProductList({ setIsShow, setTagStep, setIsBubbleShow }) {
  const canSelectItems = useRecoilValue(canSelectProductSelector);

  const navigate = useNavigate();
  const handleClickProductUploadButton = () => {
    navigate('/product/upload');
  };

  return (
    <ModalProductListWrapper>
      {canSelectItems.length > 0 ? (
        <>
          {canSelectItems.map((item) => (
            <ModalProductItem
              data={item}
              key={item.id}
              setIsShow={setIsShow}
              setTagStep={setTagStep}
              setIsBubbleShow={setIsBubbleShow}
            />
          ))}
          <Button size='md' onClick={handleClickProductUploadButton}>
            상품 등록
          </Button>
        </>
      ) : (
        <>
          <h2>회원님이 판매 중인 상품이 없습니다.</h2>
          <Button size='md' onClick={handleClickProductUploadButton}>
            상품 등록
          </Button>
        </>
      )}
    </ModalProductListWrapper>
  );
}
