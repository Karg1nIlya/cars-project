import { IAction, actionTypesAlert, initialStateAlert } from "../types/types"

export const alertReducer = (state = initialStateAlert, action: IAction) => {
    switch(action.type) {

        case actionTypesAlert.SHOW_ALERT: {
            return {...state, errorFlag: action.payload.errorFlag, textAlert: action.payload.textAlert};
        }

        case actionTypesAlert.HIDE_ALERT: {
            return {...state, errorFlag: false, textAlert: ''};
        }

        default: {
            return state;
        }
    }
}
