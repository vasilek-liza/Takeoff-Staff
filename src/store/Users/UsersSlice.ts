import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../interfaces/IUser";
import { getUsers, updateUser, deleteUser } from "./UsersThunks";

interface IUserState {
    users: IUser[],
    user: IUser,
    modifidedUsers: IUser[],
    error: string,
    loading: boolean,
    sortUp: boolean,
    userErrorMessage: string,
    deleteProfile: boolean,
};

const initialState: IUserState = {
    users: [],
    user: {
        id: null,
        password: null,
        username: null,
        first_name: null,
        last_name: null,
        is_active: null
    },
    modifidedUsers: [],
    error: "",
    loading: false,
    sortUp: false,
    userErrorMessage: "",
    deleteProfile: false,
};

export const UsersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        sorting(state: IUserState) {
            state.sortUp = !state.sortUp;
            if (state.sortUp) {
                state.modifidedUsers.sort((a: any, b: any) => b.id - a.id);
            } else {
                state.modifidedUsers.sort((a: any, b: any) => a.id - b.id);
            }
        },
        searchUsers(state: IUserState, value: any) {
            state.modifidedUsers = state.users.filter((user : any)=> {
                return user.username.includes(value.payload);
            });
        },
        resetUsers(state: IUserState) {
            state.users = []
            state.modifidedUsers = []
            state.sortUp = false
        },
        resetUser(state: IUserState) {
            state.user = {
                id: null,
                password: null,
                username: null,
                first_name: null,
                last_name: null,
                is_active: null
            }
        },
        toggleDelete(state: IUserState) {
            state.deleteProfile = !state.deleteProfile;
        }
    },
    extraReducers: {
        [getUsers.fulfilled.type]: (state: IUserState, action: any) => {
            state.error = ""
            state.loading = false
            state.users = action.payload
            state.modifidedUsers = action.payload
        },
        [getUsers.rejected.type]: (state: IUserState, action: any) => {
            state.users = []
            state.error = action.payload
        },
        [getUsers.pending.type]: (state: IUserState, action: any) => {
            state.loading = true
        },
        [updateUser.rejected.type]: (state: IUserState, action: any) => {
            state.userErrorMessage = action.payload;
        },
    },
});

export const usersReducer = UsersSlice.reducer;
export const { sorting, searchUsers, resetUsers, resetUser, toggleDelete } = UsersSlice.actions;