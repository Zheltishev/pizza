import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userDataSlice from "./userDataSlice";
import pizzaListSlice from "./pizzaListSlice";
import basketListSlice from "./basketListSlice";


const rootReducer = combineReducers({
    userDataSlice,
    pizzaListSlice,
    basketListSlice
})

export const store = configureStore({
    reducer: {
        rootReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch