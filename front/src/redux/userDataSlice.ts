import { createSlice } from "@reduxjs/toolkit"

interface IUserData {
    userAuthorize: boolean,
    userName: string,
    userId: number,
    userRole: string
}

const initialState: IUserData = {
    userAuthorize: false,
    userName: '',
    userId: 0,
    userRole: ''
}

const userDataSlice = createSlice({
    name: 'userDataSlice',
    initialState,
    reducers: {
        changeUserAuthorize: (state, action) => void (state.userAuthorize = action.payload, state.userId = 0),
        changeUserName: (state, action) => void (state.userName = action.payload),
        changeUserId: (state, action) => void (state.userId = action.payload),
        changeUserRole: (state, action) => void (state.userRole = action.payload),
    }
})

export const { changeUserAuthorize, changeUserName, changeUserId, changeUserRole } = userDataSlice.actions
export default userDataSlice.reducer