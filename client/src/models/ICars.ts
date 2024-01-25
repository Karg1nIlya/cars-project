import { IImage } from "./IImage";

export interface ICar {
    id_car?: number,
    imgs: IImage[],
    brand: string,
    model: string,
    color: string,
    price: number,
    year_release: string,
    motor: string,
    transmission: string,
    power_reserve: number | null
}

export interface IDropDown {
    id: number, 
    name: string,
}