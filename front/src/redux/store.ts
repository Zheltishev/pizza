import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userDataSlice from "./userDataSlice";


const rootReducer = combineReducers({
    userDataSlice
})

export const store = configureStore({
    reducer: {
        rootReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch