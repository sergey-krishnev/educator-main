import { professionApi } from '@/api/professionApi'
import { questApi } from '@/api/questApi'
import { skillApi } from '@/api/skillApi'
import { speechApi } from '@/api/speechApi'
import { theoryApi } from '@/api/theoryApi'
import { userProgressApi } from '@/api/userProgressApi'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    [professionApi.reducerPath]: professionApi.reducer,
    [questApi.reducerPath]: questApi.reducer,
    [skillApi.reducerPath]: skillApi.reducer,
    [theoryApi.reducerPath]: theoryApi.reducer,
    [userProgressApi.reducerPath]: userProgressApi.reducer,
    [speechApi.reducerPath]: speechApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
  .concat(professionApi.middleware)
  .concat(questApi.middleware)
  .concat(skillApi.middleware)
  .concat(theoryApi.middleware)
  .concat(userProgressApi.middleware)
  .concat(speechApi.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch