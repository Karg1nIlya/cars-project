import React from "react"
import { Outlet } from "react-router-dom"
import { Header } from "../Header/Header"
import './layout.css'

export function Layout() {
    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}