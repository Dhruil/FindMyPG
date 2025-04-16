import { configureStore } from "@reduxjs/toolkit"
import ownerReducer from "./ownerSlice"
import pgDetailsReducer from "./pgSlice";
const appstore = configureStore({

    reducer : {
        owner : ownerReducer,
        pgDetails : pgDetailsReducer
    },

})

export default appstore;