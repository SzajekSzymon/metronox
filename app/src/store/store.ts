import { configureStore } from '@reduxjs/toolkit'
import metronomeReducer from './metronomeSlice'
import patternReducer from './patternSlice'

export const store = configureStore({
  reducer: {
    metronome: metronomeReducer,
    pattern: patternReducer,
  },
  devTools: true,
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch