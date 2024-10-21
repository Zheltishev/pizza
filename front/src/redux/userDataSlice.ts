import { createSlice } from "@reduxjs/toolkit"

interface IUserData {
    userAuthorize: boolean,
    userName: string,
    userId: number
}

const initialState: IUserData = {
    userAuthorize: false,
    userName: '',
    userId: 0
}

const userDataSlice = createSlice({
    name: 'userDataSlice',
    initialState,
    reducers: {
        changeUserAuthorize: (state, action) => void (state.userAuthorize = action.payload, state.userId = 0),
        changeUserName: (state, action) => void (state.userName = action.payload),
        changeUserId: (state, action) => void (state.userId = action.payload),
    }
})

export const { changeUserAuthorize, changeUserName, changeUserId } = userDataSlice.actions
export default userDataSlice.reducer