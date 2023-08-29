import React, { useState } from 'react';
import BasicLayout from '../../../layout/BasicLayout';
import ProductForm from '../../../components/Product/ProductForm/ProductForm';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { uploadProduct } from '../../../api/productApi';

export default function ProductUploadPage() {
  const [isBtnActive, setIsBtnActive] = useState(false);
  const [productData, setProductData] = useState({});

  const navigate = useNavigate();

  const uploadProductMutation = useMutation(uploadProduct, {
    onSuccess: () => {
      navigate('/profile');
    },
    onError: () => {
      console.error('상품 등록 실패');
    },
  });

  const handleClickSave = () => {
    uploadProductMutation.mutate({
      product: {
        itemName: JSON.stringify(productData.itemName),
        price: parseInt(productData.price),
        link: productData.link,
        itemImage: productData.itemImage,
      },
    });
  };

  return (
    <BasicLayout
      type='save'
      btnText='저장'
      title={'상품 등록'}
      isBtnActive={isBtnActive}
      isNonNav={true}
      onClickRightButton={handleClickSave}
    >
      <ProductForm setIsBtnActive={setIsBtnActive} setProductData={setProductData} />
    </BasicLayout>
  );
}
