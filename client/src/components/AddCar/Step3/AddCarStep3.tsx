import React, { useEffect, useState } from "react";
import "./addCarStep3.css";
import { ExpenseDropDownList } from "../DropDownList/DropDownList";
import { IAddCarStepProps, IDropDownList } from "../../../models/ISteps";
import { InputNumber } from "../../inputs/InputNumber/InputNumber";
import { ICar } from "../../../models/ICars";

const transmissionArr: IDropDownList[] = [
    {
        id: 1, 
        name: 'Автоматическая'
    },
    {
        id: 2, 
        name: 'Ручная'
    },
    {
        id: 3, 
        name: 'Роботизированная'
    },
]

const engineArr: IDropDownList[] = [
    {
        id: 1, 
        name: 'Бензиновый'
    },
    {
        id: 2, 
        name: 'Дизельный'
    },
    {
        id: 3, 
        name: 'Электрический'
    },
]

export function AddCarStep3({onChangeBtnVisible, onChangeValues, data}: IAddCarStepProps) {
    const [transmission, setTransmission] = useState(data.transmission)
    const [engine, setEngine] = useState(data.motor)
    const [distance, setDistance] = useState(data.power_reserve?discharge(String(data.power_reserve)):'')
    const [alertDistance, setAlertDistance] = useState(false)

    useEffect(()=>{
        let objTmp:ICar = {...data}
        objTmp.motor = engine
        objTmp.transmission = transmission
        objTmp.power_reserve = (engine===engineArr[2].name ? Number(distance.replace(/ /g,'')) : null)
        onChangeValues(objTmp)
        if((!alertDistance && engine!=='' && transmission!=='' && engine!==engineArr[2].name) || (engine===engineArr[2].name && distance!=='' && distance!=='0' && !alertDistance && engine!=='' && transmission!=='')) {
            onChangeBtnVisible(true)
        } else {
            onChangeBtnVisible(false)
        }
        
    }, [distance, engine, transmission])

    function discharge(str:string): string {
        return str.replace(/[^0-9.]/g,'').replace(/\B(?=(\d{3})+(?!\d))/g, " ")
    }

    return (
        <div className="add-car-step3">
            <div className="add-car-step3__item">
                <div className="add-car-step3__label">Трансмиссия</div>
                <ExpenseDropDownList idList="transmissionList" placeholder="Выберите тип трансмиссии" data={transmissionArr} value={transmission} setValue={setTransmission}/>
            </div>
            <div className="add-car-step3__item">
                <div className="add-car-step3__label">Тип двигателя</div>
                <ExpenseDropDownList idList="engineList" placeholder="Выберите тип двигателя" data={engineArr} value={engine} setValue={setEngine}/>
            </div>
            {engine===engineArr[2].name && 
            <div className="add-car-step3__item">
                <div className="add-car-step3__label">Запас хода</div>
                <InputNumber unit="км" length={12} value={distance} setValue={setDistance} setAlert={setAlertDistance} placeHolder="Введите запас хода" attentionFlag={true}/>
            </div>
            }
        </div>
    )
}