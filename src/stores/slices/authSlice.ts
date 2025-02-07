import { createSlice } from "@reduxjs/toolkit";
import { getAuthProfile } from "../middlewares/authMiddleware";
type AuthState = {
    isAuth: boolean
    user: null | {
        name: string
    }
    isLoading: boolean
}
const initialState: AuthState = {
    isAuth: false, // trang thai dang nhap
    user: null, // thong tin user
    isLoading: true // loading
}
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        // updateAuthStatus: (state, action) => {
        //     state.isAuth = action.payload
        // },
        // updateAuthUser: (state, action) => {
        //     state.user = action.payload
        // },
        // updateLoading: (state, action) => {
        //     state.isLoading = action.payload
        // }

    },
    extraReducers: (builder) => {
        builder.addCase(getAuthProfile.fulfilled, (state, action) => {
            state.isAuth = true
            state.user = action.payload
            state.isLoading = false
        })
        builder.addCase(getAuthProfile.rejected, (state) => {
            state.isAuth = false
            state.user = null
            state.isLoading = false
        })

    }
})
// export const { updateAuthStatus } = authSlice.actions