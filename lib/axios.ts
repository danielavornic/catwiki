import axios from 'axios';

export const $axios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CAT_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': process.env.NEXT_PUBLIC_CAT_API_KEY?.replace(/\r\n/g, '') as string,
  },
});
