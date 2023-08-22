import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

const Axios = axios.create({
    baseURL: 'http://localhost:3001/api',
    withCredentials: true
})

interface User {
    email: string
    password: string
}

interface Root {
    user: {
        email: string | null,
        username: string | null
    }
    error: AxiosError | unknown
}

const initialState: Root = {
    user: {
        email: null,
        username: null
    },
    error: {}
}

export const logIn = createAsyncThunk('loginUp',async (user: User) => {
    // try {
    //     const response = await Axios.post('/login', user)
    //     return response.data
    // } catch (error) {
    //     return error
    // }
    try {
        const response = await Axios.post('/login', user);
        return response.data; // Devolver los datos obtenidos
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw error.response?.data.message; // Devolver solo el mensaje de error
        } else {
            throw error;
        }
    }
})

export const profile = createAsyncThunk('getProfile',async (token: string) => {
    try {
        const response = await Axios.get('/verify', {  
            headers: {
                Authorization: `Bearer ${token}`,
            },    
        })
        console.log(response.data)
        return response.data
    } catch (error) {
        return error
    }
})

export const logout = createAsyncThunk('logout', async () => {
    try {
        Axios.post('/logout')
        return 
    } catch (error: any) {
        throw Error(error)
    }
})

const loginUpSlice = createSlice({
    name: 'loginUp',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(logIn.fulfilled, (state, action) => {
            state.user = action.payload,
            state.error = null
        })
        builder.addCase(logIn.rejected, (state, action) => {
            state.error = action.error
        })
        builder.addCase(profile.fulfilled,(state, action) => {
            state.user = action.payload
        })
        builder.addCase(profile.rejected, (state) => {
            state.user = {email: null, username: null}
        })
        builder.addCase(logout.fulfilled, (state) => {
            state.user = {email: null, username: null}
        })
    }
})

export default loginUpSlice.reducer