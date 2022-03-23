import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const listDataKitabisa = createAsyncThunk(
    'list/data',
    async () => {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_INTERNAL_API}/api/list`);

        return response.data;
    }
)
const listSlice = createSlice({
    name: 'list',
    initialState: { data: [] },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(listDataKitabisa.fulfilled, (state, action) => {
            return { data: action.payload }
        })
    }
})

export default listSlice.reducer;