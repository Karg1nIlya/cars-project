import React, { useEffect, useState } from "react";
import "./dropDown.css";
import { IDropDown } from "../../../models/ICars";

interface IDropDownProps {
    idTitle: string,
    data: IDropDown[],
    title: string,
    onChange: (title: string) => void
}

export function DropDown({idTitle, data, title, onChange}: IDropDownProps) {
    const [contentVisible, setContentVisible] = useState(false)

    useEffect(()=>{
        window.addEventListener('click', handleClick)
        return window.removeEventListener('click', (ev)=>handleClick(ev))
    }, [])

    const handleClick = (e:Event) => {
        if((e.target as HTMLElement).closest('.drop-down__content') || (e.target as HTMLElement).closest(`#${idTitle}`)) {
            setContentVisible(true)
        } else {
            setContentVisible(false)
        }
    }

    const onChangeTitle = (newTitle: string) => {
        if(title!==newTitle) {
            onChange(newTitle)
        }
    }

    return (
        <div className="drop-down">
            <div id={idTitle} className="drop-down__title">{title}</div>
            {contentVisible &&
                <div className="drop-down__content">
                    {data.map(el=>{
                        if(el.name!==title) {
                            return (
                                <div className="drop-down__item" onClick={()=>onChangeTitle(el.name)} key={el.id}>{el.name}</div>
                            )
                        }
                    })}
                </div>
            }   
        </div>
    )
}
