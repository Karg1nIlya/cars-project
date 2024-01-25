import { ICar } from "./ICars"

export interface IStep {
    header: string,
    id: number,
    status: Status
}

export enum Status {
    inactive,
    active,
    done
}

export interface IDropDownList {
    id: number, 
    name: string,
}

export interface IAddCarStepProps {
    onChangeBtnVisible: (flag: boolean)=>void,
    onChangeValues: (obj: ICar)=>void,
    data: ICar
}