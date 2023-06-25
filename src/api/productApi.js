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
