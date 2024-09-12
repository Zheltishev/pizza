import { createSlice } from "@reduxjs/toolkit"

interface IUserData {
    userAuthorize: boolean,
    userName: string
}

const initialState: IUserData = {
    userAuthorize: false,
    userName: ''
}

const userDataSlice = createSlice({
    name: 'userDataSlice',
    initialState,
    reducers: {
        changeUserAuthorize: (state, action) => void(state.userAuthorize = action.payload)
    }
})

export const { changeUserAuthorize } = userDataSlice.actions
export default userDataSlice.reducer