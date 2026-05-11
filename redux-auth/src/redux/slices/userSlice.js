import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../api/axiosClient";

export const getProfileThunk = createAsyncThunk("user/profile", async () => {
    const res = await axiosClient.get("/api/user/profile");
    return res;
});

const userSlice = createSlice({
    name: "user",
    initialState: {
        profile: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProfileThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(getProfileThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.profile = action.payload;
            })
            .addCase(getProfileThunk.rejected, (state) => {
                state.loading = false;
                state.error = "Không thể lấy thông tin profile";
            });
    },
});

export default userSlice.reducer;
