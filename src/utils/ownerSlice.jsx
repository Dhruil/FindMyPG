import { createSlice, current } from "@reduxjs/toolkit";

const onwerSlice = createSlice({
    name: "owner",
    initialState: {
        owner: []
        },
        reducers: {
            addOwner(state, action) {
                state.owner.push(action.payload);
                },
                removeOwner(state) {
                    state.owner.length = 0;
                    },
                    updateOwner(state, action) {
                        const index = state.owner.findIndex((owner) => owner.id === action.payload.id);
                        state.owner[index] = action.payload;
                        },      
                        }

})
export const {addOwner,removeOwner} = onwerSlice.actions
export default onwerSlice.reducer;