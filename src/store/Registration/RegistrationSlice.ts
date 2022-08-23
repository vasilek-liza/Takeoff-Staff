import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../interfaces/IUser";
import { registration } from "./RegistrationThunks";

type State = {
    data: string,
    error: string,
    loading: boolean
};

const initialState: State = {
    data: "",
    error: "",
    loading: false
};

export const RegistrationSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {

    },
    extraReducers: {
        [registration.pending.type]: (state) => {
            state.loading = true
        },
        [registration.fulfilled.type]: (state, action: PayloadAction<string>) => {
            state.loading = false
            state.error = ""
            state.data = action.payload
        },
        [registration.rejected.type]: (state, action: PayloadAction<string>) => {
            state.loading = false
            state.data = ""
            state.error = action.payload
        }
    },
});

export const registrationReducer = RegistrationSlice.reducer;