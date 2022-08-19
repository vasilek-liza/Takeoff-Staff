import { createSlice } from "@reduxjs/toolkit";
import { registration } from "./RegistrationThunks";

type State = {
    data: [],
    error: string,
    loading: boolean
};

const initialState: State = {
    data: [],
    error: "",
    loading: false
};

export const RegistrationSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {

    },
    extraReducers: {
        [registration.pending.type]: (state: any) => {
            state.loading = true
        },
        [registration.fulfilled.type]: (state: any, action: any) => {
            state.loading = false
            state.error = ""
            state.data = action.payload
        },
        [registration.rejected.type]: (state: any, action: any) => {
            state.loading = false
            state.data = []
            state.error = action.payload
        }
    },
});

export const registrationReducer = RegistrationSlice.reducer;