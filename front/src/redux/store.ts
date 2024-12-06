import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userDataSlice from "./userDataSlice";
import pizzaListSlice from "./pizzaListSlice";
import basketListSlice from "./basketListSlice";
import alertSlice from "./alertSlice";

const rootReducer = combineReducers({
    userDataSlice,
    pizzaListSlice,
    basketListSlice,
    alertSlice
})

export const store = configureStore({
    reducer: {
        rootReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch