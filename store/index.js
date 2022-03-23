import { configureStore } from '@reduxjs/toolkit';
import listReducer from '../slices/listSlice';
import todoReducer from '../slices/todoSlice';

export const store = configureStore({
    reducer: {
        list: listReducer,
        todo: todoReducer
    }
});