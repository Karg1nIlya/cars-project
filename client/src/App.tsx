import React, { useEffect } from 'react'
import "./app.css"
import { AuthPage } from './pages/AuthPage/AuthPage'
import { useTypedSelector } from './hooks/useTypedSelector'
import { useDispatch } from 'react-redux'
import { checkAuth, showLoader } from '../store/actions/authActions'
import { actionTypesAuth } from '../store/types/types'
import { BrowserRouter, HashRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { MainPage } from './pages/MainPage/MainPage'
import { Layout } from './components/Layout/Layout'
import { AddCarPage } from './pages/AddCarPage/AddCarPage'
import { Alert } from './components/Alert/Alert'
import { CarPage } from './pages/CarPage/CarPage'

export function App() {
    const state = useTypedSelector(state => state.alertReducer)
    const dispatch = useDispatch()

    useEffect(() => {
        if (localStorage.getItem('accessToken')) {
            dispatch(showLoader(actionTypesAuth.SHOW_LOADER))
            const res = checkAuth(actionTypesAuth.CHECK_AUTH)
            res.then(e => {
                console.log(e)
                dispatch(e!);
            })
            .catch((e) => {
                console.log(e)
            })
        }
    }, [])

    return (
        <>
        {/* {state.textAlert !==''} */}
        <Alert/>
        <HashRouter>
            <Routes>
                <Route path='/' element={<Layout/>}>
                    <Route index element={<Navigate to='cars'/>}/>
                    <Route path = "cars" element={<MainPage/>}/>
                    <Route path = "cars/add-car" element={<AddCarPage/>}/>
                    <Route path = "car/:id" element={<CarPage/>}/>
                </Route>
                <Route path = "/auth" element={<AuthPage/>}/>
                
            </Routes>
        </HashRouter>
        {/* <AuthPage/> */}
        </>
    )
}
