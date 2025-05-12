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
    addProfession: builder.mutation<{ id: string; name: string; icon: string }, { id?: string; name: string; icon: string }>({
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
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          professionApi.util.updateQueryData('getProfessions', {}, (draft) => {
            return draft.filter((profession: { id: number; }) => profession.id !== id)
          }),
        )
        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      },
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
      async onQueryStarted({ professionId }, { dispatch, queryFulfilled }) {
        try {
          const { data: newSkill } = await queryFulfilled
          dispatch(
            professionApi.util.updateQueryData('getSkillsByProfessionId', professionId, (draft) => {
              return [...draft, newSkill]
            }),
          )
        } catch (error) {
          console.error('Error in queryFulfilled:', error);
        }
      },
    }),
    addExistedSkillToProfession: builder.mutation<void, { skillId: number; professionId: number; }>({
      query: ({ professionId, skillId }) => ({
        url: `/${professionId}/skills/${skillId}`,
        method: "PUT",
      }),
    }),
    deleteSkillFromProfession: builder.mutation<void, { skillId: number; professionId: number; }>({
      query: ({ professionId, skillId }) => ({
        url: `/${professionId}/skills/${skillId}`,
        method: "DELETE",
      }),
      async onQueryStarted({ professionId, skillId }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          professionApi.util.updateQueryData('getSkillsByProfessionId', professionId, (draft) => {
            return draft.filter((skill: { id: number; }) => skill.id !== skillId)
          }),
        )
        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      },
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
  useAddExistedSkillToProfessionMutation,
  useDeleteSkillFromProfessionMutation,
} = professionApi