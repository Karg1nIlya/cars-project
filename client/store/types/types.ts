import { ICar } from "../../src/models/ICars";
import { IUser } from "../../src/models/auth/IAuth";

export enum actionTypesAuth {
    SHOW_LOADER = 'SHOW_LOADER',
    LOGIN = 'LOGIN',
    LOGOUT = 'LOGOUT',
    REGISTRATION = 'REGISTRATION',
    CHECK_AUTH = 'CHECK_AUTH',
};

export enum actionTypesAlert {
    SHOW_ALERT = 'SHOW_ALERT',
    HIDE_ALERT = 'HIDE_ALERT'
}

export enum actionTypesCars {
    SHOW_LOADER = 'SHOW_LOADER',
    GET_CARS = 'GET_CARS',
    ADD_CAR = 'ADD_CAR',
    REMOVE_CAR = 'REMOVE_CAR'
}

export interface IStateAlert {
    errorFlag: boolean,
    textAlert: string,
}

export interface IStateAuth {
    isAuth: boolean,
    user: IUser,
    loading: boolean
}

export interface IStateCars {
    cars: ICar[] | null,
    loading: boolean
}

export interface IAction {
    type: string;
    payload?: any; 
};

export const initialStateAlert: IStateAlert = {
    errorFlag: false,
    textAlert: ''
}

export const initialStateAuth: IStateAuth = {
    isAuth: false,
    user: {id_user: 0, login: ''} as IUser,
    loading: false
};

export const initialStateCars: IStateCars = {
    cars: null,
    loading: false
}