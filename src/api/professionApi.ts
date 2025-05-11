import { API_BASE_URL } from '@/config/apiConfig';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export type Profession = {
  id: number;
  name: string;
}

export const professionApi = createApi({
  reducerPath: 'professionApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${API_BASE_URL}/professions` }),
  endpoints: (builder) => ({
    getProfessions: builder.query({
      query: () => '',
    }),
    addProfession: builder.mutation<{ id: string; name: string; icon: string }, {id?: string; name: string; icon: string }>({
      query: (data) => ({
        url: "",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        try {
          const { data: newProfession } = await queryFulfilled
          dispatch(
            professionApi.util.updateQueryData('getProfessions', {}, (draft) => {
              return data?.id ?
               draft.map((profession: { id: string | undefined; }) => profession.id === data.id ? newProfession : profession)
               : [...draft, newProfession]
            }),
          )
        } catch (error) {
          console.error('Error in queryFulfilled:', error);
        }
      },
    }),
    removeProfessionById: builder.mutation<void, number>({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
    }),
    getSkillsByProfessionId: builder.query({
      query: (id) => ({
        url: `/${id}/skills`,
        method: 'GET',
      }),
    }),
    addNewSkillToProfession: builder.mutation<void, { name: string; icon: string; professionId: number; }>({
      query: ({ professionId, ...rest }) => ({
        url: `/${professionId}/skills`,
        method: "POST",
        body: rest,
      }),
    }),
    addExistedSkillToProfession: builder.mutation<void, { skillId: number; professionId: number; }>({
      query: ({ professionId, skillId }) => ({
        url: `/${professionId}/skills/${skillId}`,
        method: "PUT",
      }),
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetProfessionsQuery,
  useAddProfessionMutation,
  useRemoveProfessionByIdMutation,
  useGetSkillsByProfessionIdQuery,
  useAddNewSkillToProfessionMutation,
  useAddExistedSkillToProfessionMutation } = professionApi