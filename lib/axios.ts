import axios from 'axios';

export const $axiosCat = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CAT_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': process.env.NEXT_PUBLIC_CAT_API_KEY?.replace(/\r\n/g, '') as string,
  },
});

export const $axiosFirebase = axios.create({
  baseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});
