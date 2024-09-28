import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userDataSlice from "./userDataSlice";
import pizzaListSlice from "./pizzaListSlice";


const rootReducer = combineReducers({
    userDataSlice,
    pizzaListSlice
})

export const store = configureStore({
    reducer: {
        rootReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch