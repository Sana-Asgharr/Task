import { createSlice } from "@reduxjs/toolkit";

const loginUserSlice = createSlice({
    name: 'loginUser',
    initialState: {
        loginUser: null,
    },
    reducers: {
        setloginUser: (state, action) => {
            state.loginUser = action.payload;
        },

    }
})

export const { setloginUser } = loginUserSlice.actions;
export default loginUserSlice.reducer;
