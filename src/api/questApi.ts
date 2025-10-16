import { API_BASE_URL } from "@/config/apiConfig";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const questApi = createApi({
  reducerPath: 'questApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${API_BASE_URL}/quests` }),
  endpoints: (builder) => ({
    getQuests: builder.query({
      query: () => '',
    }),
    getQuestById: builder.query({
      query: (id) => ({
                url: `/${id}`,
                method: 'GET',
            }),
    })
  }),
})

export const {useGetQuestsQuery, useGetQuestByIdQuery} = questApi