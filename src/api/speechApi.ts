import { API_BASE_URL } from '@/config/apiConfig';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const speechApi = createApi({
  reducerPath: 'speechApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${API_BASE_URL}/` }),
  endpoints: (builder) => ({
    recognizeSpeech: builder.mutation({
      query: (file) => {
        const formData = new FormData();
        formData.append('audio', file);

        return {
          url: 'speech/recognize',
          method: 'POST',
          body: formData,
        };
      },
    }),
  }),
});

export const { useRecognizeSpeechMutation } = speechApi;