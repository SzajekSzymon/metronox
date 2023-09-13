import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import { PatternType } from '../organisms/AddPattern /AddPattern';
import { PatternState, patternActions } from './patternSlice';
import { call, delay, put, select, takeEvery } from 'redux-saga/effects';
import { getAllUserPatterns } from '@/lib/mongo/user';

export interface UserState {
    patterns: PatternState[];
    userEmail: string
}

const initialState: UserState = {
  patterns: [],
  userEmail: ''
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
    setUserEmail: (state, action: PayloadAction<string>) => {
        state.userEmail = action.payload

    }
  },
})


function* fetchAllUserPatterns() {

  let userEmail: string = yield select((state) => state.user.userEmail);
  console.log(userEmail);
    try {
      const user: PatternState[] = yield getAllUserPatterns({username: userEmail});
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