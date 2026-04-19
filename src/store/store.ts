import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../Slice/PostSlice"
import { useDispatch, useSelector } from "react-redux";

export const store = configureStore({
    reducer: {
        post: postReducer
    }
})

type Rootstate = ReturnType<typeof store.getState>
type Dispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<Dispatch>()
export const useAppSelector = useSelector.withTypes<Rootstate>()
