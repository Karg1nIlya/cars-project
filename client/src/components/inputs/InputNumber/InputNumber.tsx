import React, { useState } from "react";
import "./inputNumber.css";

interface IInputNumber {
    length: number,
    value: string,
    attentionFlag?: boolean,
    placeHolder?: string,
    setAlert: (flag: boolean)=>void,
    setValue: (str: string)=>void,
    unit: string
}

export function InputNumber({length, unit, value, placeHolder='', setAlert, setValue, attentionFlag=false}: IInputNumber) {
    const [textAlert, setTextAlert] = useState('')
    const [attentionVisible, setAttentionVisible] = useState(false)
    
    function discharge(str:string): string {
        return str.replace(/[^0-9.]/g,'').replace(/\B(?=(\d{3})+(?!\d))/g, " ")
    }

    const changeValue = (event: React.FormEvent<HTMLInputElement>) => {
        const maxLength = length
        const lengthCurrent = event.currentTarget.value.replace(/ /g,'').length
        if(value == '0' && event.currentTarget.value[1]) {
            setValue(event.currentTarget.value[1])
        }
        else {
            setValue(event.currentTarget.value)
        }
        if(lengthCurrent<=maxLength) {
            setTextAlert('')
            setAlert(false)
        }
        else {
            setTextAlert(`кол-во символов превышено на ${lengthCurrent - maxLength}`)
            setAlert(true)
        }
    }

    const blurInput = ()=> {
        if(textAlert!==''||value==='') {
            setAttentionVisible(true)
        }
        else {
            setAttentionVisible(false)
        }
    }

    return (
        <div className="input-number">
            <div className="input-number-wrapper">
                <input placeholder={placeHolder} type='text' className="input-text__input" value={value} onChange={changeValue} onBlur={blurInput} onKeyUp={()=>{setValue(discharge(value))}}></input>{attentionVisible && attentionFlag && <b className="input-text__attention">!</b>}
                <b className="input-number__unit"> {unit}</b>
            </div>
            <div className="input-number__alert">{textAlert}</div>
        </div>
    )
}