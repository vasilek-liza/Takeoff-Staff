import { createAsyncThunk } from "@reduxjs/toolkit";
import { registrationAPI } from "../../api/Registration";
import{ IUser } from '../../interfaces/IUser';

export const registration = createAsyncThunk(
    "registration", 
    async (payload: IUser, thunkAPI): Promise<any> => {
    try {
        const { username, first_name, last_name, password, is_active } = payload;
        const response = await registrationAPI.registration({
            username: username,
            password: password,
            first_name: first_name,
            last_name: last_name,
            is_active: is_active,
        })

        await new Promise(res => setTimeout(res, 500));
        return response.data
    } catch (e: any) {
        return thunkAPI.rejectWithValue(e.message);
    }
});

