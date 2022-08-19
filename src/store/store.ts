import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { authReducer } from "./Auth/AuthSlice";
import { usersReducer } from './Users/UsersSlice';
import { registrationReducer } from "./Registration/RegistrationSlice";
import thunkMiddleware from 'redux-thunk';

export const store = configureStore({
    reducer: combineReducers({
        authReducer,
        usersReducer,
        registrationReducer
    }),
    middleware: [thunkMiddleware]
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch