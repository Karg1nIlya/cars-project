import React from "react";
import "./carItem.css";
import { ICar } from "../../../models/ICars";
import { Link } from "react-router-dom";

interface ICarItem {
    data: ICar
}

export function CarItem({data}: ICarItem) {

    return (
        <div className="car-item">
            <div className="car-item__about-car">
                <div className="car-item__img-wrapper">
                    <img className="car-item__img" src={data.imgs[0].src} />
                </div>

                <div className="car-item__info">
                    <div className="car-item__title">{data.brand + ' ' + data.model}</div>
                    <div className="car-item__info-wrapper">
                        <div className="car-info-item">
                            <div className="car-info-item__label">Цвет автомобиля: </div>
                            <b className="car-info-item__value">{data.color}</b>
                        </div>
                        <div className="car-info-item">
                            <div className="car-info-item__label">Цена автомобиля: </div>
                            <b className="car-info-item__value">{data.price.toLocaleString()}</b>
                        </div>
                        <div className="car-info-item">
                            <div className="car-info-item__label">Год выпуска автомобиля: </div>
                            <b className="car-info-item__value">{data.year_release}</b>
                        </div>
                    </div>
                </div>
            </div>

            <Link to={`/car/${data.id_car}`} className="car-item__more-btn">Подробнее</Link>
        </div>
    )
}
