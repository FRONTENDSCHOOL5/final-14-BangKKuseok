import { FOLLOWLIMIT } from '../constants/pagenation';
import { accessInstance } from './axiosInstance';

export const getFollowers = async ({ accountname, skip }) => {
  try {
    const response = await accessInstance.get(
      `/profile/${accountname}/follower/?limit=${FOLLOWLIMIT}&skip=${skip}`,
    );
    return {
      data: response.data,
      nextPage: skip,
    };
  } catch (error) {
    console.error(error);
  }
};

export const getFollowings = async ({ accountname, skip }) => {
  try {
    const response = await accessInstance.get(
      `/profile/${accountname}/following/?limit=${FOLLOWLIMIT}&skip=${skip}`,
    );

    return {
      data: response.data,
      nextPage: skip,
    };
  } catch (error) {
    console.error(error);
  }
};

export const postFollow = async (accountname) => {
  try {
    const response = await accessInstance.post(`/profile/${accountname}/follow`);
    return response.data.profile;
  } catch (error) {
    console.error(error);
  }
};

export const deleteUnFollow = async (accountname) => {
  try {
    const response = await accessInstance.delete(`/profile/${accountname}/unfollow`);
    return response.data.profile;
  } catch (error) {
    console.error(error);
  }
};
