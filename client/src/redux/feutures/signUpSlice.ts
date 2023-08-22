import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface User {
    username: string
    email: string
    password: string
}

const initialState = {
    user: {}
}

export const signUp = createAsyncThunk('signUp', async (user: User) => {
    try {
        const response = await axios.post('http://localhost:3001/api/register', user)
        return response.data
    } catch (error) {
        console.log(error)
    }
})

const SignUpSlice = createSlice({
    name: 'signUp',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(signUp.fulfilled, (state, action) => {
            state.user = action.payload
        })
    }
})

export default SignUpSlice.reducer