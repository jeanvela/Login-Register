import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

interface User {
    username: string
    email: string
    password: string
}

interface Root {
    user: {}
    error: AxiosError | unknown
}

const initialState: Root = {
    user: {},
    error: {}
}

export const signUp = createAsyncThunk('signUp', async (user: User) => {
    try {
        const response = await axios.post('https://backend-loginregister-ode4-dev.fl0.io/api/register', user)
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw error.response?.data.message
        } else {
            throw error
        }
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
        builder.addCase(signUp.rejected, (state, action) => {
            state.error = action.error
        })
    }
})

export default SignUpSlice.reducer