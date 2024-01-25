import React, { useState } from "react";
import "./inputSearching.css";

interface IInputSearching {
    onFilter: (str: string)=>void
}

export function InputSearching({onFilter}: IInputSearching) {
    const [input, setInput] = useState('')
    const [removeTextVisible, setRemoveTextVisible] = useState(false)

    const changeInput = (event: React.FormEvent<HTMLInputElement>) => {
        setInput(event.currentTarget.value)
        setRemoveTextVisible(event.currentTarget.value!==''?true:false)
    }

    const onClickFilter = () => {
        onFilter(input)
    }

    return (
        <div className="input-searching">
            <div className="input-searching__wrapper">
                <input className="input-searching__input" value={input} onChange={changeInput} placeholder="Введите текст" type="text" />
                <button className="input-searching__remove-text" onClick={()=>setInput('')}>{removeTextVisible?'x':' '}</button>
            </div>
            <button className="input-searching__search-btn" onClick={onClickFilter}>Фильтровать</button>
        </div>
    )
}
