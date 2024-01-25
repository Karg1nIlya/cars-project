import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { alertReducer } from "./alertReducer";
import { carsReducer } from "./carsReducer";

export const rootReducer = combineReducers({
    authReducer: authReducer,
    alertReducer: alertReducer,
    carsReducer: carsReducer
});

export type RootState = ReturnType<typeof rootReducer>;
