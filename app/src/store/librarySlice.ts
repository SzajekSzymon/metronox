import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import { PatternType } from '../organisms/AddPattern /AddPattern';
import { PatternState, patternActions } from './patternSlice';
import { call, delay, put, select, takeEvery } from 'redux-saga/effects';
import { getAllPatterns, getAllPatternsSharedForUser } from '@/lib/mongo/patterns';

export interface LibraryState {
    patterns: PatternState[];
    patternsSharedForUser: PatternState[];
}

const initialState: LibraryState = {
  patterns: [],
  patternsSharedForUser: [],
}

export const LibrarySlice = createSlice({
  name: 'library',
  initialState,
  reducers: { 
    getAllPatterns(_) {
    },
    savePatterns: (state, action: PayloadAction<{patterns: PatternState[], patternsSharedForUser: PatternState[]}>) => {
        state.patterns = action.payload.patterns
        state.patternsSharedForUser = action.payload.patternsSharedForUser
    }
  },
})


function* fetchAllPatterns() {

  let userEmail: string = yield select((state) => state.user.userEmail);
    try {
      const patterns: PatternState[] = yield getAllPatterns();
      const patternsSharedForUser: PatternState[] = yield getAllPatternsSharedForUser({username: userEmail});
      yield put(libraryActions.savePatterns({patterns, patternsSharedForUser}))
    } catch (e) {
     console.error(e)
    }
  }

export function* librarySaga() {
    yield takeEvery(libraryActions.getAllPatterns, fetchAllPatterns)
  }

export const libraryActions = LibrarySlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectMetronome = (state: RootState) => state.library;

export default LibrarySlice.reducer