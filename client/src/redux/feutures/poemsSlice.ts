import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const initialState = {
    poem: []
}

export const getPoems = createAsyncThunk('getPoem',async () => {
    try {
        const token = Cookies.get()
        const response = await axios.get('http://localhost:3001/api/allPoems', {
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

const poemsSlice = createSlice({
    name: 'getPoem',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getPoems.fulfilled, (state, action) => {
            state.poem = action.payload
        })
    },
})

export default poemsSlice.reducer