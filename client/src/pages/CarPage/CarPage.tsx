import React, { useEffect, useState } from "react";
import "./carPage.css";
import { Link, useParams } from "react-router-dom";
import { Slider } from "../../components/Slider/Slider";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { ICar } from "../../models/ICars";
import { getCars, showLoader } from "../../../store/actions/carsActions";
import { actionTypesAlert, actionTypesCars } from "../../../store/types/types";
import { showAlert } from "../../../store/actions/alertActions";

export function CarPage() {
    const state = useTypedSelector(state => state.carsReducer)
    const dispatch = useDispatch()
    const {id} = useParams()
    const [car, setCar] = useState<ICar>()

    useEffect(()=>{
        if(state.cars.length === 0) {
            dispatch(showLoader(actionTypesCars.SHOW_LOADER))
            const res = getCars(actionTypesCars.GET_CARS)
            res.then(e => {
                dispatch(e!);
                let carTmp = e.payload.cars.find((el: ICar)=>el.id_car===Number(id))
                console.log(carTmp)
                setCar(carTmp)
            })
            .catch(() => {
                dispatch(showAlert(actionTypesAlert.SHOW_ALERT, 'Упс... Что-то пошло не так', true))
            })
        } else {
            let carTmp = state.cars.find((el: ICar)=>el.id_car===Number(id))
            setCar(carTmp)
        }
    }, [])

    return (
        <div className="car-page">
            <div className="car-page__container">
                <div className="car-page__header">
                    <Link to="/cars" className="car-page__back-btn">Назад</Link>
                    <div className="car-page__title">Автомобиль</div>
                </div>
                <div className="car-page__content">
                    <div className="car-page__slider">
                        {car && <Slider data={car.imgs}/>}
                    </div>
                    <div className="car-page__car-info">
                        <div className="car-page-info-item">
                            <div className="car-page-info-item__label">Бренд:</div>
                            <div className="car-page-info-item__value">{car?.brand}</div>
                        </div>
                        <div className="car-page-info-item">
                            <div className="car-page-info-item__label">Модель:</div>
                            <div className="car-page-info-item__value">{car?.model}</div>
                        </div>
                        <div className="car-page-info-item">
                            <div className="car-page-info-item__label">Цвет:</div>
                            <div className="car-page-info-item__value">{car?.color}</div>
                        </div>
                        <div className="car-page-info-item">
                            <div className="car-page-info-item__label">Цена:</div>
                            <div className="car-page-info-item__value">{car?.price.toLocaleString()} ₽</div>
                        </div>
                        <div className="car-page-info-item">
                            <div className="car-page-info-item__label">Год выпуска:</div>
                            <div className="car-page-info-item__value">{car?.year_release}</div>
                        </div>
                        <div className="car-page-info-item">
                            <div className="car-page-info-item__label">Тип двигателя:</div>
                            <div className="car-page-info-item__value">{car?.motor}</div>
                        </div>
                        <div className="car-page-info-item">
                            <div className="car-page-info-item__label">Трансмиссия:</div>
                            <div className="car-page-info-item__value">{car?.transmission}</div>
                        </div>
                        {car?.power_reserve && 
                            <div className="car-page-info-item">
                                <div className="car-page-info-item__label">Запас хода:</div>
                                <div className="car-page-info-item__value">{car?.power_reserve}</div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}