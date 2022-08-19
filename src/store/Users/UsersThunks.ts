import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
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

export const getUser = createAsyncThunk("getUser", 
    async (payload: string, thunkAPI): Promise<any> => {
    try {
        const response = await userAPI.getUser(payload);
        return response.data;
    } catch (e: any) {
        return thunkAPI.rejectWithValue(e.message);
    }
})

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
        return response.data;
    } catch (e: any) {
        return thunkAPI.rejectWithValue(e.message);
    }
})

export const deleteUser = createAsyncThunk("deteleUser", 
    async (payload: {id: string}, thunkAPI): Promise<any> => {
    try {
        const response = await userAPI.deleteUser(payload.id);
        return response.data;
    } catch (e: any) {
        return thunkAPI.rejectWithValue(e.message);
    }
})

export const fetchUsers = createAsyncThunk(
    'user/fetchAll',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get<[]>('https://jsonplaceholder.typicode.com/user2s')
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue("Не удалось загрузить пользователей")
        }
    }
)