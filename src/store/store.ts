import { combineReducers, configureStore } from '@reduxjs/toolkit';
import type { PreloadedState } from '@reduxjs/toolkit'
import { playerSlice, teamSlice, matchSlice } from './features';

// Create the root reducer separately so we can extract the RootState type
const rootReducer = combineReducers({
  match: matchSlice.reducer,
  team: teamSlice.reducer,
  player: playerSlice.reducer,
})

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']