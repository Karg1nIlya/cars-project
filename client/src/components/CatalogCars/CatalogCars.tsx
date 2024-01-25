import React, { useEffect, useState } from "react";
import "./catalogCars.css";
import { Link } from "react-router-dom";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { ICar, IDropDown } from "../../models/ICars";
import { useDispatch } from "react-redux";
import { actionTypesAlert, actionTypesCars } from "../../../store/types/types";
import { getCars, showLoader } from "../../../store/actions/carsActions";
import { showAlert } from "../../../store/actions/alertActions";
import { CarItem } from "./CarItem/CarItem";
import { DropDown } from "../inputs/DropDown/DropDown";
import { filterCars, sortCars } from "../../helpers/carsHelper";
import { InputSearching } from "../inputs/InputSearching/InputSearching";

const arrParamsForSort: IDropDown[] = [
    {
        id: 1,
        name: 'времени добавления'
    },
    {
        id: 2,
        name: 'возрастанию цены'
    },
    {
        id: 3,
        name: 'убыванию цены'
    },
    {
        id: 4,
        name: 'возрастанию года выпуска'
    },
    {
        id: 5,
        name: 'убыванию года выпуска'
    },
]

const arrParamsForFilter: IDropDown[] = [
    {
        id: 1,
        name: 'марке'
    },
    {
        id: 2,
        name: 'цвету'
    },
]

export function CatalogCars() {
    const state = useTypedSelector(state => state.carsReducer)
    const [cars, setCars] = useState(state.cars?state.cars:[])
    const [currentPage, setCurrentPage] = useState(1)
    const [readyToLoad, setReadyToLoad] = useState(true)
    const [paramForSort, setParamForSort] = useState<string>(arrParamsForSort[0].name)
    const [paramForFilter, setParamForFilter] = useState<string>(arrParamsForFilter[0].name)
    const dispatch = useDispatch()

    useEffect(()=>{
        document.addEventListener('scroll', scrollHandler)
        return function() {
            document.removeEventListener('scroll', scrollHandler)
        }
    }, [])

    useEffect(()=>{
        if(state.cars) {
            setCars(sortCars(state.cars, paramForSort))
        }
    }, [state.cars])

    useEffect(()=>{
        let prevScrollPos = window.scrollY
        window.addEventListener('scroll', ()=>{
            const currentScrollPos = window.scrollY
            const height = (document.getElementById("header") as HTMLElement).scrollHeight 
            if (prevScrollPos > currentScrollPos) {
                (document.querySelector(".catalog-cars__header") as HTMLElement).style.top = `${height}px`
            } else {
                (document.querySelector(".catalog-cars__header") as HTMLElement).style.top = `0`
            }
            prevScrollPos = currentScrollPos
        })
    },[])

    useEffect(()=>{
        if(readyToLoad) {
            dispatch(showLoader(actionTypesCars.SHOW_LOADER))
            const res = getCars(actionTypesCars.GET_CARS, currentPage)
            res.then(e => {
                dispatch(e!)
                setCurrentPage(prev=>prev+1)
            })
            .catch(() => {
                dispatch(showAlert(actionTypesAlert.SHOW_ALERT, 'Упс... Что-то пошло не так', true))
            })
            .finally(()=> {
                setReadyToLoad(false) 
            })
        }
    }, [readyToLoad])

    const scrollHandler = () => {
        if(document.documentElement.scrollHeight - (document.documentElement.scrollTop+window.innerHeight)<100) {
            setReadyToLoad(true)
        }
    }

    const sortList = (sortParam: string) => {
        if(state.cars) {
            const sortedArr = sortCars(state.cars, sortParam)
            setCars(sortedArr)
        }
        setParamForSort(sortParam)
        
    }

    const filterList = (str: string) => {
        if(str==='') {
            if(state.cars) {
                setCars(sortCars(state.cars, paramForSort))
            }
            
        } else if(state.cars) {
            const filterArr = filterCars(state.cars, paramForFilter, str)
            setCars(filterArr)
        }
    }

    return (
        <div className="catalog-cars">
            <div id="catalog-header" className="catalog-cars__header">
                <div className="catalog-cars__header-info">
                    <div className="catalog-cars__title">Список автомобилий</div>
                    <Link to="add-car" className="catalog-cars__add-btn">Добавить</Link>
                </div>
                <div className="catalog-cars__header-actions">
                    <div className="catalog-cars-actions-item">
                        <div className="catalog-cars-actions-item__label">Сортировать по: </div>
                        <DropDown idTitle={'sortTitle'} title={paramForSort} data={arrParamsForSort} onChange={sortList}/>
                    </div>
                    <div className="catalog-cars-actions-item">
                        <div className="catalog-cars-actions-item__label">Фильтрация по: </div>
                        <DropDown idTitle={'filterTitle'} title={paramForFilter} data={arrParamsForFilter} onChange={setParamForFilter}/>
                    </div>
                    <div className="catalog-cars-actions-item">
                        <InputSearching onFilter={filterList}/>
                    </div>
                </div>
            </div>
            <div className="catalog-cars__list">
                {!state.loading && cars.length===0 && state.cars && 
                    <div className="catalog-cars__list-empty">Список пуст...</div>
                }
                {cars.map((el: ICar)=>{
                    return (
                        <CarItem data={el} key={el.id_car}/>
                    )
                })}
                {state.loading && 
                    <div className="catalog-cars__loading">Загрузка...</div>
                }
                
            </div>
        </div>
    )
}
