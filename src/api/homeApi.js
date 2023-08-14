import { ALLPOSTLIMIT } from '../constants/pagenation';
import { accessInstance } from './axiosInstance';

export const getAllPost = async ({ skip }) => {
  try {
    const response = await accessInstance.get(`/post?limit=${ALLPOSTLIMIT}&skip=${skip}`);
    const { posts } = response.data;

    return {
      data: posts,
      nextPage: skip,
      isLast: posts.length < 100,
    };
  } catch (error) {
    console.error(error);
  }
};
