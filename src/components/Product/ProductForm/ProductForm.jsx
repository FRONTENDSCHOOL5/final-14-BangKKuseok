import React, { useEffect, useState } from 'react';
import PostImgUpload from '../../../components/PostUpload/PostImgUpload/PostImgUpload';
import Input from '../../../components/common/Input/Input';
import useInputs from '../../../hooks/useInputs';
import defaultProductImg from '../../../assets/images/profile.png';
import { WARNING_MSG } from '../../../constants/validate';
import { ProductFormWrapper } from './ProductFormStyle';

export default function ProductForm({ setIsBtnActive, setProductData, selectedProduct = '' }) {
  const [itemImage, setImage] = useState(selectedProduct ? selectedProduct.itemImage : '');
  const [itemName, itemNameError, handleChangeName, handleBlurName] = useInputs(
    selectedProduct ? JSON.parse(selectedProduct.itemName).name : '',
    'itemName',
  );
  const [keyword, keywordError, handleChangeKeyword, handleBlurKeyword] = useInputs(
    selectedProduct ? JSON.parse(selectedProduct.itemName).keyword : '',
    'keyword',
  );
  const [price, priceError, handleChangePrice, handleBlurPrice] = useInputs(
    selectedProduct ? selectedProduct.price : '',
    'price',
  );
  const [link, linkError, handleChangeLink, handleBlurLink] = useInputs(
    selectedProduct ? selectedProduct.link : '',
    'link',
  );

  useEffect(() => {
    // error가 있거나 input 값이 빈 값이라면 active가 false
    if (
      itemNameError ||
      keywordError ||
      priceError ||
      linkError ||
      !itemName ||
      !keyword ||
      !price ||
      !link
    ) {
      setIsBtnActive(false);
    } else {
      // error가 없으면 active가 true
      setIsBtnActive(true);
      setProductData({
        itemImage: itemImage.length > 0 ? itemImage : defaultProductImg,
        itemName: { name: itemName, keyword: keyword },
        price,
        link,
      });
    }
  }, [
    itemNameError,
    keywordError,
    priceError,
    linkError,
    itemImage,
    itemName,
    keyword,
    price,
    link,
  ]);

  return (
    <ProductFormWrapper>
      <PostImgUpload
        type='product'
        setImg={setImage}
        setIsBtnActive={setIsBtnActive}
        uploadedImg={itemImage}
      />
      <Input
        type='text'
        id='itemName'
        placeHolder={`${WARNING_MSG['itemName']} ex)노란색 스탠드`}
        labelText='상품명'
        value={itemName}
        onChange={handleChangeName}
        onBlur={handleBlurName}
        warningMsg={itemNameError}
        isInValid={itemNameError}
      />
      <Input
        type='text'
        id='keyword'
        placeHolder={`${WARNING_MSG['keyword']} ex) 조명`}
        labelText='키워드'
        value={keyword}
        onChange={handleChangeKeyword}
        onBlur={handleBlurKeyword}
        warningMsg={keywordError}
        isInValid={keyword}
      />
      <Input
        type='number'
        id='price'
        placeHolder={`${WARNING_MSG['price']}`}
        labelText='가격'
        value={price}
        onChange={handleChangePrice}
        onBlur={handleBlurPrice}
        warningMsg={priceError}
        isInValid={price}
      />
      <Input
        type='text'
        id='link'
        placeHolder={'URL을 입력해 주세요.'}
        labelText='판매 링크'
        value={link}
        onChange={handleChangeLink}
        onBlur={handleBlurLink}
        warningMsg={linkError}
        isInValid={link}
      />
    </ProductFormWrapper>
  );
}
