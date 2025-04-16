import { createSlice, current } from "@reduxjs/toolkit";

const pgSlice = createSlice({
    name: "pgDetails",
    initialState: {
        details: []
        },
        reducers: {
            addDetails(state, action) {
                state.details.push(action.payload);
                },
                removeDetails(state) {
                    state.details.length = 0;
                    },
                    updateDetails(state, action) {
                        const index = state.details.findIndex((details) => details.id === action.payload.id);
                        state.details[index] = action.payload;
                        },      
                        }

})
export const {addDetails,removeDetails} = pgSlice.actions
export default pgSlice.reducer;