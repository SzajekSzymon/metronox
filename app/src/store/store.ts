import { configureStore } from '@reduxjs/toolkit'
import metronomeReducer from './metronomeSlice'
import patternReducer from './patternSlice'
import userReducer, { userSaga } from './userSlice'
import createSagaMiddleware from 'redux-saga'

const sagaMiddleware = createSagaMiddleware()


export const store = configureStore({
  reducer: {
    metronome: metronomeReducer,
    pattern: patternReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
  devTools: true,
})

sagaMiddleware.run(userSaga)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch