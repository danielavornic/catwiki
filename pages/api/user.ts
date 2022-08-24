import { $axios } from 'lib';

export const user = {
  getByUid: async ({ uid, idToken }: { uid: string; idToken?: string }) => {
    const { data } = await $axios.get(
      `${process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL}/users.json`,
    );

    return data;
  },
};
