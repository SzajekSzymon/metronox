import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import { PatternType } from '../organisms/AddPattern /AddPattern';
import { put, select, takeEvery } from 'redux-saga/effects';
import { updatePattern } from '@/lib/mongo/patterns';
import { userActions } from './userSlice';

export interface PatternState {
    _id: string | null;
    projectName: string | null;
    public: boolean
    patterns: {
        tempo: number;
        metre: number;
        accent: number;
        name: string;
        loops: number;
    }[]
}

const initialState: PatternState = {
  _id: null,
  projectName: 'your pattern project',
  public: false,
  patterns: []
}

export const patternSlice = createSlice({
  name: 'pattern',
  initialState,
  reducers: { 
    addPattern: (state, action: PayloadAction<PatternType>) => {
      state.patterns = [...state.patterns, action.payload]
    },
    editPattern: (state, action: PayloadAction<{pattern: PatternType; id: number | null}>) => {
      if(action.payload.id) {
        state.patterns[action.payload.id] = action.payload.pattern;
      }
    },
    requestUpdatePattern(_) {
    },
    changeProjectName: (state, action: PayloadAction<string>) => {
      state.projectName = action.payload
    },
    changePublic: (state, action: PayloadAction<boolean>) => {
      state.public = action.payload
    },
    setProject: (state, action: PayloadAction<PatternState>) => {
      state.projectName = action.payload.projectName;
      state.patterns = action.payload.patterns;
      state.public = action.payload.public;
      state._id = action.payload._id;
    }
  },
})

function* requestUpdatePattern() {
  let pattern: PatternState  = yield select((state) => state.pattern); 

  try {
    yield updatePattern(pattern);
    yield put(userActions.getAllUserPatterns());
  } catch (e) {
   console.error(e)
  }
}

export function* patternSaga() {
  yield takeEvery(patternActions.requestUpdatePattern, requestUpdatePattern)
}


export const patternActions = patternSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectMetronome = (state: RootState) => state.pattern

export default patternSlice.reducer