import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../api/axiosClient";

export const loginThunk = createAsyncThunk("auth/login", async (data) => {
    const res = await axiosClient.post("/api/auth/login", data);
    return res;
});

export const registerThunk = createAsyncThunk("auth/register", async (data) => {
    const res = await axiosClient.post("/api/auth/register", data);
    return res;
});

export const forgotPasswordThunk = createAsyncThunk(
    "auth/forgot-password",
    async (data) => {
        const res = await axiosClient.post("/api/auth/forgot-password", data);
        return res;
    },
);

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isAuthenticated: false,
        user: null,
        loading: false,
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            localStorage.removeItem("access_token");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginThunk.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload?.EC === 0) {
                    state.isAuthenticated = true;
                    state.user = action.payload.user;
                    localStorage.setItem(
                        "access_token",
                        action.payload.access_token,
                    );
                } else {
                    state.error = action.payload?.EM;
                }
            })
            .addCase(loginThunk.rejected, (state) => {
                state.loading = false;
                state.error = "Đã có lỗi xảy ra";
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
