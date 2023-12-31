import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const initialState = {
    poems: []
}

export const getPoemsUser = createAsyncThunk('getPoemsUser',async () => {
    try {
        const token = Cookies.get()
        // https://backend-loginregister-production.up.railway.app
        // https://backend-loginregister-ode4-dev.fl0.io/
        const response = await axios.get('https://backend-loginregister-ode4-dev.fl0.io/api/poems', {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token.token}`
            }
        })
        return response.data
    } catch (error: any) {
        throw Error(error)
    }
})

const poemsUserSlice = createSlice({
    name: 'getPoemsUser',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getPoemsUser.fulfilled, (state, action) => {
            state.poems = action.payload
        })
    }
})

export default poemsUserSlice.reducer