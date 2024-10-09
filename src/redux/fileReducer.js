import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    file: undefined,
    filePreview: undefined
};

export const fileSlicer = createSlice({
    name: 'file',
    initialState,
    reducers: {
        addFile(state, action) {
            console.log(action.payload);

            state.file = action.payload;
        },
        removeFile(state) {
            state.file = undefined;
        },
        addFilePreview(state, action) {
            state.filePreview = action.payload;
        }
    }
});

