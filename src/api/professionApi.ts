import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export type Profession = {
  id: number;
  name: string;
}

export const professionApi = createApi({
  reducerPath: 'professionApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/api/professions' }),
  endpoints: (builder) => ({
    getProfessions: builder.query({
      query: () => '',
    }),
    addProfession: builder.mutation<{ id: string; name: string; icon: string }, { name: string; icon: string }>({
      query: (data) => ({
        url: "",
        method: "POST",
        body: data,
      }),
    }),
    removeProfessionById: builder.mutation<void, number>({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetProfessionsQuery, useAddProfessionMutation, useRemoveProfessionByIdMutation } = professionApi