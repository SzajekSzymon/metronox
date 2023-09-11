import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import { PatternType } from '../organisms/AddPattern /AddPattern';
import { PatternState, patternActions } from './patternSlice';
import { call, put, takeEvery } from 'redux-saga/effects';
import { getAllUserPatterns } from '@/lib/mongo/patterns';

export interface UserState {
    patterns: PatternState[]
}

const initialState: UserState = {
  patterns: []
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: { 
    getAllUserPatterns(_) {
    },
    savePatterns: (state, action: PayloadAction<PatternState[]>) => {
      state.patterns = action.payload
    },
  },
})


function* fetchAllUserPatterns() {

    try {
      const user: PatternState[] = yield getAllUserPatterns();
      yield put(userActions.savePatterns(user))
      yield put(patternActions.refreshPattern())
    } catch (e) {
     console.error(e)
    }
  }

export function* userSaga() {
    yield takeEvery(userActions.getAllUserPatterns, fetchAllUserPatterns)
  }

export const userActions = userSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectMetronome = (state: RootState) => state.user;

export default userSlice.reducer