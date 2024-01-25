import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './signIn.css'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import { useDispatch } from 'react-redux'
import { login, showLoader } from '../../../../store/actions/authActions'
import { actionTypesAlert, actionTypesAuth } from '../../../../store/types/types'
import { showAlert } from '../../../../store/actions/alertActions'

export function SignIn() {
    // const state = useTypedSelector(state => state.authReducer)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [loginSignin, setLoginSignin] = useState<string>('')
    const [passwordSignin, setPasswordSignin] = useState<string>('')
    const [error, setError] = useState('')

    const changeLoginSignin = (event: React.FormEvent<HTMLInputElement>) => {
        setLoginSignin(event.currentTarget.value)
    }

    const changePasswordSignin = (event: React.FormEvent<HTMLInputElement>) => {
        setPasswordSignin(event.currentTarget.value)
    }

    const onSignIn = () => {
        dispatch(showLoader(actionTypesAuth.SHOW_LOADER))
        const res = login(actionTypesAuth.LOGIN, loginSignin, passwordSignin)
        res.then(e => {
            setError('')
            dispatch(e!);
            navigate('/')
            dispatch(showAlert(actionTypesAlert.SHOW_ALERT, 'Вы вошли в систему', false))
        })
        .catch((e) => {
            dispatch(showAlert(actionTypesAlert.SHOW_ALERT, 'Упс... Что-то пошло не так', true))
            setError(e.response?.data?.message)
        })
    }

    return (
        <div className="signin__wrapper">
            <b className="auth-label">Логин</b>
            <input className="signin__login" type="text" onChange={changeLoginSignin} value={loginSignin}/>
            <b className="auth-label">Пароль</b>
            <input className="signin__password" type="password" onChange={changePasswordSignin} value={passwordSignin} />
            <div className="sign-in__error">{error}</div>
            <button className="signin__submit" onClick={onSignIn}>Войти</button>
        </div>           
    )
}