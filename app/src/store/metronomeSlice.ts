import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import { SOUNDS } from '../utils/sounds'

interface MetronomeState {
  defaultBeat: string,
  accentBeat: string,
  patternMode: boolean,
}

const initialState: MetronomeState = {
  defaultBeat: SOUNDS.find((el) => el.label === "metronome_2")?.value || '',
  accentBeat: SOUNDS.find((el) => el.label === "metronome_1")?.value || '',
  patternMode: false,
}

export const metronomeSLice = createSlice({
  name: 'metronome',
  initialState,
  reducers: { 
    changeDefaultBeat: (state, action: PayloadAction<string>) => {
      state.defaultBeat = action.payload
    },
    changeAccentBeat: (state, action: PayloadAction<string>) => {
      state.accentBeat = action.payload
    },
    enablePatternMode: (state, action: PayloadAction<boolean>) => {
      state.patternMode = action.payload
    },
  },
})

export const { changeDefaultBeat, changeAccentBeat, enablePatternMode } = metronomeSLice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectMetronome = (state: RootState) => state.metronome

export default metronomeSLice.reducer