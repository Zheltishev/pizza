import { createSlice } from "@reduxjs/toolkit"

interface IAlert {
    alertModalOpen: boolean,
    alertStatus: boolean,
    alertMessage: string
}

const initialState: IAlert = {
    alertModalOpen: false,
    alertStatus: false,
    alertMessage: 'test message'
}

const alertSlice = createSlice({
    name: 'alertSlice',
    initialState,
    reducers: {
        alertChangeModalOpen: (state, action) => void (state.alertModalOpen = action.payload),
        alertChangeStatus: (state, action) => void (state.alertStatus = action.payload),
        alertChangeMessage: (state, action) => void (state.alertMessage = action.payload)
    }
})

export const { alertChangeModalOpen, alertChangeStatus, alertChangeMessage } = alertSlice.actions
export default alertSlice.reducer