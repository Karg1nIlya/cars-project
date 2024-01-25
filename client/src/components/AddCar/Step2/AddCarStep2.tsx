import React, { useEffect, useState } from "react";
import "./addCarStep2.css";
import { InputText } from "../../inputs/InputText/InputText";
import { InputNumber } from "../../inputs/InputNumber/InputNumber";
import { InputYear } from "../../inputs/InputYear/InputYear";
import { IAddCarStepProps } from "../../../models/ISteps";
import { ICar } from "../../../models/ICars";

export function AddCarStep2({onChangeBtnVisible, onChangeValues, data}: IAddCarStepProps) {
    const [color, setColor] = useState(data.color)
    const [year, setYear] = useState(String(data.year_release))
    const [sum, setSum] = useState(discharge(String(data.price)))
    const [alertSum, setAlertSum] = useState(false)
    const [alertColor, setAlertColor] = useState(false)

    useEffect(()=>{
        let objTmp:ICar = {...data}
        objTmp.color = color
        objTmp.price = Number(sum.replace(/ /g,''))
        console.log(year)
        objTmp.year_release = year
        onChangeValues(objTmp)
        if(!alertColor && !alertSum && year!=='' && sum!==''&& sum!=='0' && color!=='') {
            onChangeBtnVisible(true)
        } else {
            onChangeBtnVisible(false)
        }
        
    }, [color, year, sum])

    function discharge(str:string): string {
        return str.replace(/[^0-9.]/g,'').replace(/\B(?=(\d{3})+(?!\d))/g, " ")
    }

    return (
        <div className="add-car-step1">
            <div className="add-car-step1__item">
                <div className="add-car-step1__label">Цвет</div>
                <InputText length={35} value={color} setValue={setColor} setAlert={setAlertColor} placeHolder="Введите цвет" attentionFlag={true}/>
            </div>
            <div className="add-car-step1__item">
                <div className="add-car-step1__label">Цена</div>
                <InputNumber unit="₽" length={12} value={sum} setValue={setSum} setAlert={setAlertSum} placeHolder="Введите сумму" attentionFlag={true}/>
            </div>
            <div className="add-car-step1__item">
                <div className="add-car-step1__label">Год выпуска</div>
                <InputYear value={year} setValue={setYear} attentionFlag={true}/>
            </div>
        </div>
    )
}