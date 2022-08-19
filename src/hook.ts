import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import type { RootState, store } from "./store/store";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
type AppAction = ReturnType<typeof store.dispatch>;
export type AppDispatch = ThunkDispatch<RootState, any, AppAction>;
export const useAppDispatch = () => useDispatch<AppDispatch>();

