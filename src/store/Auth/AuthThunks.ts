import { createAsyncThunk } from "@reduxjs/toolkit";
import { authAPI } from "../../api/AuthAPI";
import { registrationAPI } from "../../api/Registration";
import { userAPI } from "../../api/UserAPI";
import { setUsername } from "./AuthSlice";
import { IUserData } from "../../interfaces/IUserData";

export const getToken = createAsyncThunk("getToken", async  (payload: IUserData, thunkAPI) => {
    try {
        const { data: { access_token }} = await authAPI.getToken(payload);
        userAPI.setToken(access_token);
        thunkAPI.dispatch(setUsername(payload.username!));
        registrationAPI.setToken(access_token);
        return access_token;
    } catch (e) {
        return thunkAPI.rejectWithValue((e as Error).message);
    }
});

