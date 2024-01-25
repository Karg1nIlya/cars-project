import React, { useEffect } from "react";
import "./alert.css";
import { useDispatch } from "react-redux";
import { hideAlert } from "../../../store/actions/alertActions";
import { actionTypesAlert } from "../../../store/types/types";
import { useTypedSelector } from "../../hooks/useTypedSelector";

export function Alert() {
    const state = useTypedSelector(state => state.alertReducer)

    const dispatch = useDispatch()

    useEffect(()=>{
        if(state.textAlert !== '') {
            console.log(state.textAlert);
            (document.querySelector('.alert') as HTMLElement).style.opacity = '1';
            setTimeout(()=>{
                dispatch(hideAlert(actionTypesAlert.HIDE_ALERT));
                (document.querySelector('.alert') as HTMLElement).style.opacity = '0';
            }, 3000)
        }
    }, [state.textAlert])

    const closeAlert = () => {
        (document.querySelector('.alert') as HTMLElement).style.opacity = '0';
        dispatch(hideAlert(actionTypesAlert.HIDE_ALERT));
    }

    return (
        <div className={`alert alert-${state.errorFlag?'error-bcg':'success-bcg'}`}>
            {/* <div className="alert__text">{state.textAlert}</div> */}
            <div className={`alert-${state.errorFlag?'error':'success'} alert__text`}>{state.textAlert}</div>
            <button className={`alert-${state.errorFlag?'error':'success'} alert__close-btn`} onClick={closeAlert}>&#10006;</button>
        </div>
    )
}