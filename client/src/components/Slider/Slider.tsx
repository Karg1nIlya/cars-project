import React, { useEffect, useState } from "react";
import "./slider.css";
import { IImage } from "../../models/IImage";

interface ISlider {
    data: IImage[],
}

export function Slider({data}: ISlider) {
    const [widthSlider, setWidthSlider] = useState(0)
    const [widthSliderLine, setWidthSliderLine] = useState(0)
    const [numberActive, setNumberActive] = useState(1)
    const [countArr, setCountArr] = useState([0])

    useEffect(()=>{
        const widthSlider = (document.querySelector(".slider-line__items") as HTMLElement).offsetWidth
        const widthLine = (document.querySelector('.slider-line') as HTMLElement).offsetWidth
        // setWidthSlider(widthSlider)
        let arrNum: number[] = []
        for(let i=0; i<Math.trunc(widthSlider/widthLine); i++) {
            arrNum.push(0)
        }
        setCountArr(arrNum);
    }, [])

    const nextSlider = () => {
        const widthSliderTmp = (document.querySelector('.slider-line')as HTMLElement).offsetWidth
        const widthSliderLineTmp = (document.querySelector('.slider-pointers__point-container')as HTMLElement).offsetWidth
        if(numberActive<countArr.length) {
            setNumberActive(numberActive+1)
            setWidthSlider(widthSlider+widthSliderTmp)
            if((numberActive+1)<countArr.length && (numberActive+1)>=4) {
                setWidthSliderLine(widthSliderLine+widthSliderLineTmp)
            }
            
        }
    }

    const prevSlider = () => {
        const widthTmp = (document.querySelector('.slider-line')as HTMLElement).offsetWidth
        const widthSliderLineTmp = (document.querySelector('.slider-pointers__point-container')as HTMLElement).offsetWidth
        if(widthSlider!==0) {
            setNumberActive(numberActive-1)
            setWidthSlider(widthSlider-widthTmp)
            if((numberActive-1)>0 && (numberActive-1)<=countArr.length-3) {
                setWidthSliderLine(widthSliderLine-widthSliderLineTmp)
            }
        }
    }

    return (
        <div className="slider">
            <div className="slider__prev-btn-container">
                <button className="slider__prev-btn" onClick={prevSlider}>{"<"}</button>
            </div>
            <div className="slider__next-btn-container" onClick={nextSlider}>
                <button className="slider__next-btn">{">"}</button>
            </div>
            <div className="slider-line">
                <div className="slider-line__items" style={{
                    transform: `translateX(-${widthSlider}px)`
                }}>
                    {data.map((el,i)=>{
                        return(
                            <div className="slider-line-item__img-container" key={i}>
                                <img src={el.src} className="slider-line-item__img" />
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="slider-pointers-line">
                <div className="slider-pointers" style={{
                    transform: `translateX(-${widthSliderLine}px)`
                }}>
                    {data.map((el, i)=>{
                        return (
                            <div className="slider-pointers__point-container" key={i}>
                                <div className={`slider-point${i+1===numberActive?'--active':''}`}></div>
                            </div>
                            
                        )
                    })}
                </div>
            </div>
        </div>
    )
}