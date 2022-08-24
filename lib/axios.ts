import axios from 'axios';

export const $axios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
