import React, { useState } from 'react'
import './auth.css'
import { SignIn } from './SignIn/SignIn'
import { SignUp } from './SignUp/SignUp'

export function Auth() {
    const [signinVisible, setSigninVisible] = useState(true)

    return (
        <div className="auth">
            <div className="auth__header">
                <button className={`auth__header-signin${signinVisible===true ? '--active' : ''}`} onClick={()=>setSigninVisible(true)}>Вход</button>
                <button className={`auth__header-signin${signinVisible===false ? '--active' : ''}`} onClick={()=>setSigninVisible(false)}>Регистрация</button>
            </div>
            {signinVisible && 
                <SignIn/>
            }
            {!signinVisible && 
                <SignUp/>
            }
            
        </div>
    )
}