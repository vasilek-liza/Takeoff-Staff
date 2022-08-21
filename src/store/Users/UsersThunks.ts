import { createAsyncThunk } from "@reduxjs/toolkit";
import { userAPI } from "../../api/UserAPI";
import { setAccount } from "../Auth/AuthSlice";
import { IUser } from '../../interfaces/IUser';

export const getUsers = createAsyncThunk("getUsers",
    async (_, thunkAPI): Promise<any> => {
    try {
        const response = await userAPI.getUsers();
        thunkAPI.dispatch(setAccount(response.data))
        return response.data;
    } catch (e: any) {
        return thunkAPI.rejectWithValue(e.message);
    }
});

export const updateUser =  createAsyncThunk("updateUser", 
    async (payload: {id: string, data: IUser}, thunkAPI): Promise<any> => {
    try {
        const response = await userAPI.updateUser(payload.id, {
            username: payload.data.username!,
            first_name: payload.data.first_name,
            last_name: payload.data.last_name,
            password: payload.data.password!,
            is_active: payload.data.is_active,
        });
        console.log(payload.data)
        return response.data;
    } catch (e: any) {
        return thunkAPI.rejectWithValue(e.message);
    }
})

export const deleteUser = createAsyncThunk("deteleUser", 
    async (id: string, thunkAPI): Promise<any> => {
    try {
        const response = await userAPI.deleteUser(id);
        return response.data;
    } catch (e: any) {
        return thunkAPI.rejectWithValue(e.message);
    }
})