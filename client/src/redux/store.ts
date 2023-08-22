import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import loginUpSclice from "./feutures/loginUpSclice";
import signUpSlice from "./feutures/signUpSlice";
import createPoemSlice from "./feutures/createPoemSlice";
import poemsSlice from "./feutures/poemsSlice";
import poemsUserSlice from "./feutures/poemsUserSlice";

export const store = configureStore ({
    reducer: {
        signUp: signUpSlice,
        loginUp: loginUpSclice,
        createPoem: createPoemSlice,
        getPoems: poemsSlice,
        getPoemsUser: poemsUserSlice,
    },
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
