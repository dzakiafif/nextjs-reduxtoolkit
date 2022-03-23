import { createSlice } from "@reduxjs/toolkit";

export const todoSlice = createSlice({
    name: 'todo',
    initialState: [
        {id: 1, title: 'belajar redux toolkit 1', complete: true},
        {id: 2, title: 'belajar redux toolkit 2', complete: false},
        {id: 3, title: 'belajar redux toolkit 3', complete: false}
    ],
    reducers: {
        addTodo: (state, action) => {
            const { title } = action.payload;
            const ids = state.map((newTodo) => newTodo.id);
            const newId = Math.max(...ids) + 1;
            const todo = {
                id: newId,
                title,
                complete: false
            }

            const newState = [...state, todo];

            return newState;

        },
        completeTodo: (state, action) => {
            const newState = state.map((newTodo) => {
                if (newTodo.id === action.payload) {
                    return {
                        id: newTodo.id,
                        title: newTodo.title,
                        complete: true
                    }
                }

                return newTodo;
            })

            return newState;
        },
        unCompleteTodo: (state, action) => {
            const newState = state.map((newTodo) => {
                if (newTodo.id === action.payload) {
                    return {
                        id: newTodo.id,
                        title: newTodo.title,
                        complete: false
                    }
                }

                return newTodo;
            })

            return newState;
        },
        deleteTodo: (state, action) => {
            const newState = state.filter((newTodo) => newTodo.id !== action.payload);

            return newState;
        },
        updateTodo: (state, action) => {
            const newState = state.map((newTodo) => {
                if (newTodo.id === action.payload) {
                    return {
                        id: newTodo.id,
                        title: action.payload.title,
                        complete: newTodo.complete
                    }
                }

                return newTodo;
            })

            return newState;
        }
    }
})

export const { addTodo, completeTodo, unCompleteTodo, deleteTodo, updateTodo } = todoSlice.actions;

export default todoSlice.reducer;