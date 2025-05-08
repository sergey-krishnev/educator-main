import { API_BASE_URL } from "@/config/apiConfig";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const theoryApi = createApi({
    reducerPath: 'theoryApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${API_BASE_URL}/theories` }),
    endpoints: (builder) => ({
        editTheory: builder.mutation<void, { title: string; content?: string; id?: number}>({
            query: ({id, ...rest}) => ({
                url: `/${id}`,
                method: "PUT",
                body: rest,
            }),
        }),
        deleteTheory: builder.mutation<void, number>({
            query: (id) => ({
                url: `/${id}`,
                method: "DELETE",
            }),
        }),
    }),
})

export const { useEditTheoryMutation, useDeleteTheoryMutation } = theoryApi