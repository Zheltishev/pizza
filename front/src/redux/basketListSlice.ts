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
        basketDeletePizza: (state, action) => void (state.basketList = state.basketList.filter(e => e.pizza_id !== action.payload)),
        increasePizzaCount: (state, action) => void (state.basketList = state.basketList.map(e => {
            if (e.pizza_id === action.payload) {
                const changedPizza = e

                changedPizza.pizza_count += 1
                
                return changedPizza
            } 

            return e
        } )),
        decreasePizzaCount: (state, action) => void (state.basketList = state.basketList.map(e => {
            if (e.pizza_id === action.payload) {
                const changedPizza = e

                changedPizza.pizza_count -= 1
                
                return changedPizza
            } 

            return e
        } ))
    }
})

export const { 
    basketAddPizza, 
    basketDeletePizza, 
    increasePizzaCount,
    decreasePizzaCount
} = basketListSlice.actions
export default basketListSlice.reducer