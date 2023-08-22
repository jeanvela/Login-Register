import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

interface Poem {
    title: string
    text: string,
    // user: string
}

const initialState = {
    poem: {
        title: '',
        text: '',
        user: '',
    }
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
        console.log(response)
        return response.data
    } catch (error: any) {
        throw Error(error)
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
    }
})

export default createPoemSlice.reducer