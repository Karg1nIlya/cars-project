import React, { useState } from "react";
import "./inputText.css";

interface IInputText {
    length: number,
    value: string,
    attentionFlag?: boolean,
    placeHolder?: string,
    setValue: (str: string)=>void,
    setAlert: (flag: boolean)=>void,
}

export function InputText({length, value, setAlert, attentionFlag=false, setValue, placeHolder=''}: IInputText) {
    const [textAlert, setTextAlert] = useState('')
    const [attentionVisible, setAttentionVisible] = useState(false)

    const changeValue = (event: React.FormEvent<HTMLInputElement>) => {
        const maxLength = length
        const currentLength = event.currentTarget.value.length
        
        setValue(event.currentTarget.value)
        if(currentLength<=maxLength) {
            setAttentionVisible(false)
            setTextAlert('')
            setAlert(false)
        }
        else {
            // if(setAlert !== undefined) {
            //     setAlert(`допустимое количество символов превышено на ${currentLength - maxLength}`)
            // }
            setAttentionVisible(true)
            setTextAlert(`допустимое количество символов превышено на ${currentLength - maxLength}`)
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
        <div className="input-text">
            <div className="input-text-wrapper">
                <input placeholder={placeHolder} type='text' className="input-text__input" value={value} onChange={changeValue} onBlur={blurInput}></input>{attentionVisible && attentionFlag && <b className="input-text__attention">!</b>}
            </div>
            <div className="input-text__alert">{textAlert}</div>
        </div>
        
    )
}