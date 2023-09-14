import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import { PatternType } from '../organisms/AddPattern /AddPattern';
import { PatternState, patternActions } from './patternSlice';
import { call, delay, put, select, takeEvery } from 'redux-saga/effects';
import { getAllPatterns } from '@/lib/mongo/patterns';

export interface LibraryState {
    patterns: PatternState[];
}

const initialState: LibraryState = {
  patterns: [],
}

export const LibrarySlice = createSlice({
  name: 'library',
  initialState,
  reducers: { 
    getAllPatterns(_) {
    },
    savePatterns: (state, action: PayloadAction<PatternState[]>) => {
        state.patterns = action.payload
    }
  },
})


function* fetchAllPatterns() {

  let userEmail: string = yield select((state) => state.user.userEmail);
  console.log(userEmail);
    try {
      const patterns: PatternState[] = yield getAllPatterns();
      yield put(libraryActions.savePatterns(patterns))
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