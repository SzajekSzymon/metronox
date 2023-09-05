import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import { PatternType } from '../organisms/AddPattern /AddPattern';

export interface PatternState {
    projectId: number | null;
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
  projectId: null,
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
      state.projectId = action.payload.projectId;
    }
  },
})

export const { addPattern, changeProjectName, changePublic, setProject } = patternSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectMetronome = (state: RootState) => state.pattern

export default patternSlice.reducer