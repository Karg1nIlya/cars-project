import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './signUp.css'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import { registration, showLoader } from '../../../../store/actions/authActions'
import { actionTypesAuth } from '../../../../store/types/types'

export function SignUp() {
    const state = useTypedSelector(state => state.authReducer)
    const dispatch = useDispatch()
    const [loginSignup, setLoginSignup] = useState<string>('')
    const [passwordSignup, setPasswordSignup] = useState<string>('')
    const [passwordRepeatSignup, setPasswordRepeatSignup] = useState<string>('')
    const [error, setError] = useState('')

    const changeLoginSignup = (event: React.FormEvent<HTMLInputElement>) => {
        setLoginSignup(event.currentTarget.value)
    }

    const changePasswordSignup = (event: React.FormEvent<HTMLInputElement>) => {
        setPasswordSignup(event.currentTarget.value)
    }

    const changePasswordRepeatSignup = (event: React.FormEvent<HTMLInputElement>) => {
        setPasswordRepeatSignup(event.currentTarget.value)
    }

    const onSignUp = () => {
        dispatch(showLoader(actionTypesAuth.SHOW_LOADER))
        const res = registration(actionTypesAuth.REGISTRATION, loginSignup, passwordSignup)
        res.then(e => {
            console.log(e)
            setError('')
            dispatch(e!);
        })
        .catch((e) => {
            setError(e.response?.data?.message)
        })
    }

    return (
        <div className="signup__wrapper">
            <b className="auth-label">Логин</b>
            <input className="signup__login" type="text" onChange={changeLoginSignup} value={loginSignup}/>
            <b className="auth-label">Пароль</b>
            <input className="signup__password" type="password" onChange={changePasswordSignup} value={passwordSignup} />
            <b className="auth-label">Повторите пароль</b>
            <input className="signup__password-repeat" type="password" onChange={changePasswordRepeatSignup} value={passwordRepeatSignup} />
            <div className="sign-in__error">{error}</div>
            <button className="signup__submit" onClick={onSignUp}>Зарегестрироваться</button>
        </div> 
    )
}