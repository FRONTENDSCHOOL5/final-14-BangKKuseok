import { FEEDPOSTLIMIT } from '../constants/pagenation';
import { accessInstance } from './axiosInstance';

export const getFeedPost = async ({ skip }) => {
  try {
    const response = await accessInstance.get(`/post/feed/?limit=${FEEDPOSTLIMIT}&skip=${skip}`);
    const { posts } = response.data;

    return {
      data: posts,
      nextPage: skip,
    };
  } catch (error) {
    console.error(error);
  }
};
