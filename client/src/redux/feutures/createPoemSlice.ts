import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";

interface Poem {
    title: string
    text: string,
}

interface Root {
    poem: {}
    error: AxiosError | unknown
}

const initialState: Root = {
    poem: {
        title: '',
        text: '',
        user: '',
    },
    error: {}
}

export const postPoem = createAsyncThunk('createPoem', async (poem: Poem) => {
    try {
        const token = Cookies.get()
        const response = await axios.post('http://localhost:3001/api/poems/post', poem, {
            headers: {
                Authorization: `Bearer ${token.token}`
            },
            withCredentials: true
        })
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw error.response?.data.mensaje
        } else {
            throw error
        }
    }
})

const createPoemSlice = createSlice({
    name: 'createPoem',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(postPoem.fulfilled, (state, action) => {
            state.poem = action.payload
        })
        builder.addCase(postPoem.rejected, (state, action) => {
            state.error = action.error
        })
    }
})

export default createPoemSlice.reducer