import React, { useState } from "react";
import "./addCarPage.css";
import ProgressLine from "../../components/ProgressLine/Steps";
import { IStep, Status } from "../../models/ISteps";
import { AddCarStep1 } from "../../components/AddCar/Step1/AddCarStep1";
import { Link, useNavigate } from "react-router-dom";
import { AddCarStep2 } from "../../components/AddCar/Step2/AddCarStep2";
import { AddCarStep3 } from "../../components/AddCar/Step3/AddCarStep3";
import { ICar } from "../../models/ICars";
import { useDispatch } from "react-redux";
import { actionTypesAlert, actionTypesCars } from "../../../store/types/types";
import { addCar, showLoader } from "../../../store/actions/carsActions";
import { showAlert } from "../../../store/actions/alertActions";

const steps: IStep[] = [
    {
        header: "Шаг 1",
        id: 1,
        status: Status.active
    },
    {
        header: "Шаг 2",
        id: 2,
        status: Status.inactive
    },
    {
        header: "Шаг 3",
        id: 3,
        status: Status.inactive
    },
]

export function AddCarPage() {
    const [stepsArr, setStepsArr] = useState(steps)
    const [nextBtnVisible, setNextBtnVisible] = useState(true)
    const [contentArrIndex, setContentArrIndex] = useState(0)
    const [carDTO, setCarDTO] = useState<ICar>({
        imgs: [],
        brand: '',
        model: '',
        color: '',
        price: 0,
        year_release: '',
        motor: '',
        transmission: '',
        power_reserve: null
    })
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const content = [<AddCarStep1 onChangeBtnVisible={changeBtnVisible} onChangeValues={onChangeCarDTO} data={carDTO}/>,
                    <AddCarStep2 onChangeBtnVisible={changeBtnVisible} onChangeValues={onChangeCarDTO} data={carDTO}/>,
                    <AddCarStep3 onChangeBtnVisible={changeBtnVisible} onChangeValues={onChangeCarDTO} data={carDTO}/>]

    function onChangeCarDTO(obj: ICar) {
        setCarDTO(obj)
    } 

    const nextStep = ()=> {
        if(nextBtnVisible && contentArrIndex<=(stepsArr.length-2)) {
            stepsArr[contentArrIndex+1].status = Status.active
            setContentArrIndex(contentArrIndex+1)
        }
    }

    const earlierStep = ()=> {
        if(contentArrIndex>0) {
            stepsArr[contentArrIndex-1].status = Status.active
            stepsArr[contentArrIndex].status = Status.inactive
            setContentArrIndex(contentArrIndex-1)
        }
    }

    function changeBtnVisible(flag: boolean) {
        setNextBtnVisible(flag)
        changeStatus(flag ? Status.done : Status.active)
        if(flag) {

        }
    }

    const changeStatus = (status: Status) => {
        stepsArr[contentArrIndex].status = status
    }

    const onAddCar = () => {
        dispatch(showLoader(actionTypesCars.SHOW_LOADER))
        const res = addCar(actionTypesCars.ADD_CAR, carDTO)
        res.then(e => {
            dispatch(e!);
            dispatch(showAlert(actionTypesAlert.SHOW_ALERT, 'Автомобиль был успешно добавлен', false))
            navigate('/')
        })
        .catch((e) => {
            dispatch(showAlert(actionTypesAlert.SHOW_ALERT, 'Упс... Что-то пошло не так', true))
        })
    }

    return (
        <div className="add-car-page">
            <div className="add-car-page__wrapper">
                <div className="add-car-page__title">Добавление автомобиля</div>
                <div className="add-car-page__content">
                    <ProgressLine stepsArr={steps}/>
                    {content[contentArrIndex]}
                </div>
                <div className="add-car-page__action-btns">
                    <Link to="/" className="add-car-page-button add-car-page__cancel-btn">Отменить</Link>
                    <button className={`add-car-page-button add-car-page__early-btn${contentArrIndex===0?'':'--active'}`} onClick={earlierStep}>Назад</button>
                    {contentArrIndex!==2 &&
                        <button className={`add-car-page-button add-car-page__next-btn${nextBtnVisible?'--active':''}`} onClick={nextStep}>Далее</button>
                    }
                    {contentArrIndex===2 &&
                        <button className={`add-car-page-button add-car-page__add-btn${nextBtnVisible?'--active':''}`} onClick={onAddCar}>Добавить</button>
                    }
                </div>
            </div>
            
        </div>
    )
}