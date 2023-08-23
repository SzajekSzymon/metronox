import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import { PatternType } from '../organisms/AddPattern /AddPattern';

interface PatternState {
    projectId: number | null;
    projectName: number | null;
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
  projectName: null,
  patterns: []
}

export const patternSlice = createSlice({
  name: 'pattern',
  initialState,
  reducers: { 
    addPattern: (state, action: PayloadAction<PatternType>) => {
      state.patterns = [...state.patterns, action.payload]
    },
  },
})

export const { addPattern } = patternSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectMetronome = (state: RootState) => state.pattern

export default patternSlice.reducer