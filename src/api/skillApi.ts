import { API_BASE_URL } from '@/config/apiConfig';
import { UniqueIdentifier } from '@dnd-kit/core';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const skillApi = createApi({
    reducerPath: 'skillApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${API_BASE_URL}/skills` }),
    endpoints: (builder) => ({
        getTheoriesBySkillId: builder.query({
            query: (id) => ({
                url: `/${id}/theories`,
                method: 'GET',
            }),
        }),
        addNewTheoryToSkill: builder.mutation<void, { title: string; content: string; skillId?: number; parent?: UniqueIdentifier | null }>({
            query: ({skillId, ...rest}) => ({
                url: `/${skillId}/theories`,
                method: "POST",
                body: rest,
            }),
        }),
    }),
})

export const { useGetTheoriesBySkillIdQuery, useAddNewTheoryToSkillMutation } = skillApi