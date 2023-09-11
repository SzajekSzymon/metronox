import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { PatternType } from "../organisms/AddPattern /AddPattern";
import { call, put, select, takeEvery } from "redux-saga/effects";
import { deletePattern, updatePattern } from "@/lib/mongo/patterns";
import { UserState, userActions } from "./userSlice";
import { enablePatternMode } from "./metronomeSlice";

export interface PatternState {
  _id: string | null;
  projectName: string | null;
  public: boolean;
  patterns: {
    tempo: number;
    metre: number;
    accent: number;
    name: string;
    loops: number;
    silent: boolean;
  }[];
}

export const initialState: PatternState = {
  _id: null,
  projectName: "your pattern project",
  public: false,
  patterns: []
};

export const patternSlice = createSlice({
  name: "pattern",
  initialState,
  reducers: {
    addPattern: (state, action: PayloadAction<PatternType>) => {
      state.patterns = [...state.patterns, action.payload];
    },
  editPattern: (
      state,
      action: PayloadAction<{ pattern: PatternType; id: number | null }>
    ) => {
      if (action.payload.id !== null) {
        state.patterns[action.payload.id] = action.payload.pattern;
      }
    },
    requestUpdatePattern(_) {},
    refreshPattern(_) {},
    requestRemovePattern(
      state,
      action: PayloadAction<{ index: number | null }>
    ) {},
    changeProjectName: (state, action: PayloadAction<string>) => {
      state.projectName = action.payload;
    },
    changePublic: (state, action: PayloadAction<boolean>) => {
      console.log(action.payload);
      state.public = action.payload;
    },
    setProject: (state, action: PayloadAction<PatternState>) => {
      state.projectName = action.payload.projectName;
      state.patterns = action.payload.patterns;
      state.public = action.payload.public;
      state._id = action.payload._id;
    },
  },
});


function* requestUpdatePattern() {
  let pattern: PatternState = yield select((state) => state.pattern);

  console.log(pattern);
  try {
    yield updatePattern(pattern);
    yield put(userActions.getAllUserPatterns());
  } catch (e) {
    console.error(e);
  }
}
function* refreshPattern() {
  let pattern: PatternState = yield select((state) => state.pattern);
  let patterns: PatternState[] = yield select((state) => state.user.patterns);

  const patternToRefresh = patterns.find(
    (el: PatternState) => el._id === pattern._id
  );

  console.log(patternToRefresh);
  if (patternToRefresh) {
    yield put(patternActions.setProject(patternToRefresh));
  }
}

function* requestRemovePattern(action: any) {
  let pattern: PatternState = yield select((state) => state.pattern);

  try {
    yield deletePattern({ pattern, index: action.payload.index });
    yield put(userActions.getAllUserPatterns());
    yield put(patternActions.refreshPattern());
  } catch (e) {
    console.error(e);
  }
}
function* handleSetProject() {
  yield put(enablePatternMode(true));
}



export function* patternSaga() {
  yield takeEvery(patternActions.requestUpdatePattern, requestUpdatePattern);
  yield takeEvery(patternActions.requestRemovePattern, requestRemovePattern);
  yield takeEvery(patternActions.refreshPattern, refreshPattern);
  yield takeEvery(patternActions.setProject, handleSetProject);
}

export const patternActions = patternSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectMetronome = (state: RootState) => state.pattern;

export default patternSlice.reducer;
