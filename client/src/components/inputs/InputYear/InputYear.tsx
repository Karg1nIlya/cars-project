import React, { useState } from "react";
import "./inputYear.css";

interface IInputYear {
    value: string,
    attentionFlag?: boolean,
    setValue: (str: string)=>void
}

export function InputYear({value, setValue, attentionFlag=false}: IInputYear) {
    const [attentionVisible, setAttentionVisible] = useState(false)
    

    const blurInput = ()=> {
        if(value==='') {
            setAttentionVisible(true)
        }
        else {
            setAttentionVisible(false)
        }
    }

    return (
        <div className="input-year">
            <input
                className="input-year__input"
                value={value}
                onChange={(e)=>setValue(e.currentTarget.value)}
                type="month"
                min="1900-01"
                max={`${new Date().getFullYear()}-${new Date().getMonth()}`} 
                onBlur={blurInput}
            />
            {attentionVisible && attentionFlag && <b className="input-year__attention">!</b>}
        </div>
    )
}