import { professionApi } from '@/api/professionApi'
import { skillApi } from '@/api/skillApi'
import { theoryApi } from '@/api/theoryApi'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    [professionApi.reducerPath]: professionApi.reducer,
    [skillApi.reducerPath]: skillApi.reducer,
    [theoryApi.reducerPath]: theoryApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(professionApi.middleware).concat(skillApi.middleware).concat(theoryApi.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch