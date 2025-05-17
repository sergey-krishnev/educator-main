import { API_BASE_URL } from '@/config/apiConfig';
import { UniqueIdentifier } from '@dnd-kit/core';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { professionApi } from './professionApi';

export const skillApi = createApi({
    reducerPath: 'skillApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${API_BASE_URL}/skills` }),
    endpoints: (builder) => ({
        updateSkill: builder.mutation<void, { id: number; name: string; icon: string; professionId: number }>({
            query: ({ id, ...rest }) => ({
                url: `/${id}`,
                method: 'PUT',
                body: rest,
            }),
            async onQueryStarted({ id, professionId, ...rest }, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    professionApi.util.updateQueryData('getSkillsByProfessionId', professionId, (draft) => {
                        console.log(draft.map((skill: { id: number; }) => skill.id === id ? { ...skill, ...rest } : skill))
                        return draft.map((skill: { id: number; }) => skill.id === id ? { ...skill, ...rest } : skill)
                    }),
                )
                try {
                    await queryFulfilled
                } catch {
                    patchResult.undo()
                }
            },
        }),
        getTheoriesBySkillId: builder.query({
            query: (id) => ({
                url: `/${id}/theories`,
                method: 'GET',
            }),
        }),
        addNewTheoryToSkill: builder.mutation<void, { title: string; content: string; skillId?: number; parent?: UniqueIdentifier | null }>({
            query: ({ skillId, ...rest }) => ({
                url: `/${skillId}/theories`,
                method: "POST",
                body: rest,
            }),
            async onQueryStarted(_data, { dispatch, queryFulfilled }) {
                const { data: theory } = await queryFulfilled

                const addTheoryImmutable = (theories: any[], newTheory: any): any[] => {
                    return theories.map(theory => {
                        if (theory.id === newTheory.parent) {
                            return {
                                ...theory,
                                subTheories: theory.subTheories
                                    ? [...theory.subTheories, newTheory]
                                    : [newTheory],
                            };
                        }
                        if (theory.subTheories) {
                            return {
                                ...theory,
                                subTheories: addTheoryImmutable(theory.subTheories, newTheory),
                            };
                        }
                        return theory;
                    })
                }

                const patchResult = dispatch(
                        skillApi.util.updateQueryData('getTheoriesBySkillId', theory?.skill, (draft) => {
                            return theory?.parent ? addTheoryImmutable(draft, theory) : [...draft, theory]
                        }),
                    )
                    try {
                        await queryFulfilled
                    } catch {
                        patchResult.undo()
                    }
                },
            }),
        moveTheory: builder.mutation<void, { skillId: number; targetTheoryId: number; newParentId?: number | null; newIndexPosition: number }>({
            query: ({ skillId, targetTheoryId, newIndexPosition, newParentId }) => ({
                url: `/${skillId}/theories/move-theory`,
                method: 'PUT',
                params: {
                    targetTheoryId,
                    newIndexPosition,
                    ...(newParentId ? { newParentId } : {}),
                },
            }),
        }),
    }),
})

export const { useGetTheoriesBySkillIdQuery, useAddNewTheoryToSkillMutation, useMoveTheoryMutation, useUpdateSkillMutation } = skillApi