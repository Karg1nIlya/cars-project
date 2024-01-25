import $api, { API_URL } from "../http";
import axios, { AxiosResponse } from "axios";
import { ICar } from "../models/ICars";

export default class CarService {
    static async getCars(page: number) {
        return (await axios.get(`${API_URL}/get-cars/?page=${page}&limit=10`)).data as ICar[]
    }

    static addCar(car: ICar): Promise<AxiosResponse<ICar[]>> {
        return $api.post<ICar[]>(`${API_URL}/add-car`, {car: car})
    }
}