import { IUser } from "../../src/models/auth/IAuth";
import { IAction, actionTypesAuth, initialStateAuth } from "../types/types"

export const authReducer = (state = initialStateAuth, action: IAction) => {
    switch(action.type) {

        case actionTypesAuth.SHOW_LOADER: {
            return {...state, loading: true};
        }

        case actionTypesAuth.REGISTRATION: {
            // console.log('asdasdsad')// , user: action.payload.user
            return { ...state, loading: false }
        }

        case actionTypesAuth.LOGIN: {
            return { ...state, loading: false, isAuth: true }
        }

        case actionTypesAuth.CHECK_AUTH: {
            return { ...state, loading: false, isAuth: true, user: action.payload.user }
        }

        case actionTypesAuth.LOGOUT: {
            return { ...state, loading: false, isAuth: false}
        }

        default: {
            return state;
        }
    }
}
