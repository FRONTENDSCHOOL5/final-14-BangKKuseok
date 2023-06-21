import { accessInstance } from './axiosInstance';

export const deleteProduct = async (productId) => {
  try {
    const response = await accessInstance.delete(`/product/${productId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
