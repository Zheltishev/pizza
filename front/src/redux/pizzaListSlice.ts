import { createSlice } from "@reduxjs/toolkit"
import { IPizza } from "../tsModals/tsModals"

interface IPizzaList {
    pizzaList: IPizza[]
} 

const initialState: IPizzaList = {
    pizzaList: []
}

const pizzaListSlice = createSlice({
    name: 'pizzaListSlice',
    initialState,
    reducers: {
        changePizzaList: (state, action) => void (state.pizzaList = action.payload)
    }
})

export const { changePizzaList } = pizzaListSlice.actions
export default pizzaListSlice.reducer