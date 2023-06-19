import axios from 'axios';

export const URL = 'https://api.mandarin.weniv.co.kr/';

// 기본 인스턴스
export const instance = axios.create({
  baseURL: URL,
  headers: { 'Content-Type': 'application/json' },
});

// 이미지 인스턴스
export const imgInstance = axios.create({
  baseURL: URL,
  headers: { 'Content-type': 'multipart/form-data' },
});

// 토큰이 포함된 접근 인스턴스
export const accessInstance = axios.create({
  baseURL: URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});
