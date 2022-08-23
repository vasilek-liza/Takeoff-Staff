import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../interfaces/IUser";
import { getToken } from "./AuthThunks";

interface IState {
    loading: boolean,
    error: string,
    token: string,
    username: string,
    account: IUser
}

const initialState: IState = {
    loading: false,
    error: "",
    token: "",
    username: "",
    account: {
        id: null,
        password: null,
        username: null,
        first_name: null,
        last_name: null,
        is_active: null
    }
};

export const AuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        removeToken(state: IState) {
            state.token = "";
            state.username = "";
            state.account = {
                id: null,
                password: null,
                username: null,
                first_name: null,
                last_name: null,
                is_active: null
            };
        },
        setUsername (state: IState, action: PayloadAction<string>) {
            state.username = action.payload;
        },
        setAccount(state: IState, action: PayloadAction<IUser[]>) {
            state.account = action.payload.find((user?: IUser) => user!.username == state.username)!;
        }
    },
    extraReducers: {
        [getToken.pending.type]: (state: IState) => {
            state.loading = true
        },
        [getToken.fulfilled.type]: (state: IState, action: PayloadAction<string>) => {
            state.loading = false
            state.error = ""
            state.token = action.payload
        },
        [getToken.rejected.type]: (state: IState, action: PayloadAction<string>) => {
            state.loading = false
            state.token = ""
            state.error = action.payload
        }
    },
});

export const authReducer = AuthSlice.reducer;
export const { removeToken, setUsername, setAccount } = AuthSlice.actions;