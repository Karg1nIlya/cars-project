import React, { useEffect, useState } from "react";
import "./dropDownList.css";
import { IDropDownList } from "../../../models/ISteps";

interface IDropDownListProps {
    data: IDropDownList[],
    value: string,
    setValue: (val: string)=>void,
    placeholder: string,
    idList: string
}

export function ExpenseDropDownList({idList, data, value, setValue, placeholder}: IDropDownListProps) {
    const [searchSelector, setSearchSelector] = useState('')

    const setItem = ()=> {
        (document.getElementById(idList) as HTMLInputElement).checked = false
    }

    return (
        <div className="drop-down-list">
            <input className="drop-down-list-input" type="checkbox" name="accord" id={idList}></input>
            <label className="drop-down-list__title" htmlFor={idList}>
                <p>{value === '' ?  placeholder : value}</p> 
            </label> 
            <div className="drop-down-list__content">
                <ul>
                {data.map((el)=>{
                    return (
                        <li key={el.id} onClick={()=>{
                            setValue(el.name)
                            setItem()
                        }}><p>{el.name}</p></li>
                    )
                })}
                </ul>
            </div>      
        </div>
    )
}
