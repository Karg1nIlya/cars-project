import React, { useEffect } from "react";
import "./mainPage.css";
import { CatalogCars } from "../../components/CatalogCars/CatalogCars";

export function MainPage() {

    return (
        <div className="main-page">
            <div className="container">
                <CatalogCars/>
            </div>
        </div>
    )
}