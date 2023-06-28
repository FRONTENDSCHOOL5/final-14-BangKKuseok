import { accessInstance } from './axiosInstance';

export const deleteProduct = async (productId) => {
  try {
    const response = await accessInstance.delete(`/product/${productId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const uploadProduct = async (product) => {
  try {
    const response = await accessInstance.post(`/product`, product);
    return response.product;
  } catch (error) {
    console.error(error);
  }
};

export const getProducts = async (accountname) => {
  try {
    const response = await accessInstance.get(`/product/${accountname}`);
    return response.data.product;
  } catch (error) {
    console.error(error);
  }
};

export const getProductDetail = async (productId) => {
  try {
    const response = await accessInstance.get(`/product/detail/${productId}`);
    return response.data.product;
  } catch (error) {
    console.error(error);
  }
};

export const updateProduct = async ({ productId, product }) => {
  try {
    const response = await accessInstance.put(`/product/${productId}`, { product: product });
    return response.data.product;
  } catch (error) {
    console.error(error);
  }
};
