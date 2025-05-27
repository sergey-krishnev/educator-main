import { API_BASE_URL } from "@/config/apiConfig";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userProgressApi = createApi({
    reducerPath: 'userProgressApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${API_BASE_URL}/user-progress` }),
    endpoints: (builder) => ({
        getUserProgress: builder.query({
            query: () => '',
        }),
        createUserProgress: builder.mutation({
            query: (newProgress) => ({
                url: '',
                method: 'POST',
                body: newProgress,
            }),
            async onQueryStarted(_newProgress, { dispatch, queryFulfilled }) {
                try {
                    const { data: createdProgress } = await queryFulfilled;
                    console.log('Created user progress:', createdProgress);
                    dispatch(
                        userProgressApi.util.updateQueryData('getUserProgress', {}, (draft) => {
                            console.log('New user progress created:', createdProgress, draft);
                            return createdProgress;
                        }),
                    );
                } catch (error) {
                    console.error('Error in queryFulfilled:', error);
                }
            }
        }),
    }),
});

export const { useGetUserProgressQuery, useCreateUserProgressMutation } = userProgressApi;