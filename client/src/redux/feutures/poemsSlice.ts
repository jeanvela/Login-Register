import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";

interface initial {
    poem: []
    error: AxiosError | unknown
}

const initialState: initial = {
    poem: [],
    error: {}
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
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw error.response?.data.message
        }
        throw error
    }
})

const poemsSlice = createSlice({
    name: 'getPoem',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getPoems.fulfilled, (state, action) => {
            state.poem = action.payload
            state.error = null
        })
        builder.addCase(getPoems.rejected, (state, action) => {
            state.error = action.error
        })
    },
})

export default poemsSlice.reducer