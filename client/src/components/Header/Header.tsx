import React, { useEffect } from "react";
import "./header.css";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useNavigate } from "react-router-dom";
import { logout, showLoader } from "../../../store/actions/authActions";
import { actionTypesAlert, actionTypesAuth } from "../../../store/types/types";
import { showAlert } from "../../../store/actions/alertActions";

const logoutImg = require('../../../public/assets/img/exit.png')

export function Header() {
    const state = useTypedSelector(state => state.authReducer)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(()=>{
        let prevScrollPos = window.scrollY
        window.onscroll = function() {
            const currentScrollPos = window.scrollY
            const height = (document.getElementById("header") as HTMLElement).scrollHeight 
            if (prevScrollPos > currentScrollPos) {
                (document.getElementById("header") as HTMLElement).style.top = "0"
            } else {
                (document.getElementById("header") as HTMLElement).style.top = `-${height}px`
            }
            prevScrollPos = currentScrollPos
        }
    },[])

    const onLogout = () => {
        dispatch(showLoader(actionTypesAuth.SHOW_LOADER))
        const res = logout(actionTypesAuth.LOGOUT)
        res.then(e => {
            // console.log(e)
            dispatch(e!)
            navigate('/auth')
            dispatch(showAlert(actionTypesAlert.SHOW_ALERT, 'Вы вышли из системы', false))
        })
        .catch((e) => {
            dispatch(showAlert(actionTypesAlert.SHOW_ALERT, 'Упс... Что-то пошло не так', true))
            console.log(e)
        })
    }

    return (
        <div id="header" className="header">
            <div className="header-content">
                <div className="header__logo">Автомобили</div>
                {state.isAuth?
                <div className="header__logout" onClick={onLogout}>
                    <div className="header__login">{state.user.login}</div>
                    <button className="header__logout-btn">
                        <img className="header__logout-img" src={logoutImg} alt="logoutImg" />
                    </button>
                </div>
                :
                <button className="header__login-btn" onClick={()=>navigate('/auth')}>Войти</button>
                }
                
            </div>
        </div>
    )
}