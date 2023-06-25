import React, { useState } from 'react';
import BasicLayout from '../../../layout/BasicLayout';
import ProductForm from '../../../components/Product/ProductForm/ProductForm';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getProductDetail, updateProduct } from '../../../api/productApi';

export default function ProductEditPage() {
  const [isBtnActive, setIsBtnActive] = useState(false);
  const [productData, setProductData] = useState({});

  const navigate = useNavigate();
  const location = useLocation();
  const productId = location.state;

  const queryClient = useQueryClient();

  // 상품 상세정보 가져오기
  const { data: productDetail, isLoading: isProductDetailLoading } = useQuery(
    ['productDetail', productId],
    () => getProductDetail(productId),
    {
      enabled: !!productId,
    },
  );

  const updateProductMutation = useMutation(updateProduct, {
    onSuccess: (data) => {
      queryClient.setQueryData(['productDetail', productId], data);
      navigate('/profile');
    },
    onError: () => {
      console.error('상품 수정 실패');
    },
  });

  const handleClickSave = () => {
    updateProductMutation.mutate({
      productId: productId,
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
      type='imageSelect'
      btnText='저장'
      title={'상품 수정'}
      isBtnActive={isBtnActive}
      isNonNav={true}
      onClickLeftButton={() => navigate(-1)}
      onClickRightButton={handleClickSave}
    >
      <ProductForm
        setIsBtnActive={setIsBtnActive}
        setProductData={setProductData}
        selectedProduct={productDetail}
      />
    </BasicLayout>
  );
}
