import { API_BASE_URL } from "@/config/apiConfig";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { skillApi } from "./skillApi";

export const theoryApi = createApi({
    reducerPath: 'theoryApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${API_BASE_URL}/theories` }),
    endpoints: (builder) => ({
        editTheory: builder.mutation<void, { title: string; content?: string; id?: number }>({
            query: ({ id, ...rest }) => ({
                url: `/${id}`,
                method: "PUT",
                body: rest,
            }),
            async onQueryStarted({ id, ...rest }, { dispatch, queryFulfilled }) {

                const { data: updatedTheory } = await queryFulfilled

                const updateTheoryById = (theories: any[], updates: any): any[] =>
                    theories.map(theory => {
                        if (theory.id === updatedTheory?.id) {
                            return { ...theory, ...updates };
                        }
                        if (theory.subTheories) {
                            return { ...theory, subTheories: updateTheoryById(theory.subTheories, updates) };
                        }
                        return theory;
                    });

                const patchResult = dispatch(
                    skillApi.util.updateQueryData('getTheoriesBySkillId', updatedTheory.skill, (draft) => {
                        return updateTheoryById(draft, rest)
                    }),
                )
                try {
                    await queryFulfilled
                } catch {
                    patchResult.undo()
                }
            },
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