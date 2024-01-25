import { IAction, actionTypesCars, initialStateCars } from "../types/types"

export const carsReducer = (state = initialStateCars, action: IAction) => {
    switch(action.type) {
        case actionTypesCars.SHOW_LOADER: {
            return {...state, loading: true};
        }

        case actionTypesCars.GET_CARS: {
            const cars = state.cars ? state.cars : []
            return {...state, loading: false, cars: [...cars, ...action.payload.cars]}
        }

        case actionTypesCars.ADD_CAR: {
            const cars = state.cars ? state.cars : []
            return {...state, loading: false, cars: [...cars, action.payload.car]}
        }

        default: {
            return state;
        }
    }
}
