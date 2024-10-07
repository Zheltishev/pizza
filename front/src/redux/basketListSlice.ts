import { createSlice } from "@reduxjs/toolkit"
import { IOrderPizza } from "../tsModals/tsModals"

interface IBasketList {
    basketList: IOrderPizza[]
} 

const initialState: IBasketList = {
    basketList: []
}

const basketListSlice = createSlice({
    name: 'basketListSlice',
    initialState,
    reducers: {
        basketAddPizza: (state, action) => void (state.basketList.push(action.payload)),
        basketDeletePizza: (state, action) => void (state.basketList = state.basketList.filter(e => e.pizza_id !== action.payload))
    }
})

export const { basketAddPizza, basketDeletePizza } = basketListSlice.actions
export default basketListSlice.reducer