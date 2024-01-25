import { ICar } from "../../src/models/ICars"
import CarService from "../../src/services/CarService"

export const showLoader = (type: string) => {
    return {
        type
    }
}

export const getCars = async (type: string, page: number) => {
    try {
        const response = await CarService.getCars(page)
        return {
            type,
            payload: {
                cars: response
            }
        }
    } catch (e: any) {
        throw e
    } 
}

export const addCar = async (type: string, car: ICar) => {
    try {
        const response = await CarService.addCar(car)
        console.log(response.data)
        return {
            type,
            payload: {
                car: response.data
            }
        }
    } catch (e: any) {
        throw e
    } 
}
