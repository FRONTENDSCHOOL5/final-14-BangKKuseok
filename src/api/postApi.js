import { MYPOSTLIMIT } from '../constants/pagenation';
import { accessInstance } from './axiosInstance';

export const getMyPost = async ({ accountname, skip }) => {
  try {
    const response = await accessInstance.get(
      `/post/${accountname}/userpost/?limit=${MYPOSTLIMIT}&skip=${skip}`,
    );
    const { post } = response.data;

    return {
      data: post,
      nextPage: skip,
    };
  } catch (error) {
    console.error(error);
  }
};

export const uploadPost = async (postData) => {
  try {
    const response = await accessInstance.post(`/post`, postData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getPostDetail = async (postId) => {
  try {
    const response = await accessInstance.get(`/post/${postId}`);
    return response.data.post;
  } catch (error) {
    console.error(error);
  }
};

export const editPost = async ({ postId, post }) => {
  try {
    const response = await accessInstance.put(`/post/${postId}`, { post: { ...post } });
    return response.data.post;
  } catch (error) {
    console.error(error);
  }
};

export const deletePost = async (postId) => {
  try {
    const response = await accessInstance.delete(`/post/${postId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const reportPost = async (postId) => {
  try {
    const response = await accessInstance.post(`/post/${postId}/report`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
