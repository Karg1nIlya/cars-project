import React, { useEffect, useState } from "react";
import "./addCarStep1.css";
import { IImage } from "../../../models/IImage";
import { ImgItem } from "./ImgItem/ImgItem";
import { InputFileImages } from "../../inputs/InputFileImages/InputFileImages";
import { InputText } from "../../inputs/InputText/InputText";
import { IAddCarStepProps } from "../../../models/ISteps";
import { ICar } from "../../../models/ICars";

export function AddCarStep1({onChangeBtnVisible, onChangeValues, data}: IAddCarStepProps) {
    const [brand, setBrand] = useState(data.brand)
    const [model, setModel] = useState(data.model)
    const [images, setImages] = useState<IImage[]>(data.imgs)
    const [alertBrand, setAlertBrand] = useState(false)
    const [alertModel, setAlertModel] = useState(false)

    useEffect(()=>{
        let objTmp:ICar = {...data}
        objTmp.brand = brand
        objTmp.model = model
        objTmp.imgs = images
        onChangeValues(objTmp)
        if(!alertBrand && !alertModel && model!=='' && brand!=='' && images.length!==0) {
            onChangeBtnVisible(true)
        } else {
            onChangeBtnVisible(false)
        }
        
    }, [brand, model, images])

    const openFileInput = ()=> {
        (document.querySelector('#input-file') as HTMLInputElement).click();
    }

    const removeImage = (src: string) => {
        setImages(images.filter( el => el.src !== src ))
    }

    const onSetImages = (img: IImage|[]) => {
        if(Array.isArray(img)) {
            setImages([])
        } else {
            setImages(prev=>[...prev, img])
        }
    }

    return (
        <div className="add-car-step1">
            <div className="add-car-step1__item">
                <div className="add-car-step1__label">Бренд</div>
                <InputText length={35} value={brand} setValue={setBrand} setAlert={setAlertBrand} placeHolder="Введите название бренда" attentionFlag={true}/>
            </div>
            <div className="add-car-step1__item">
                <div className="add-car-step1__label">Модель</div>
                <InputText length={35} value={model} setValue={setModel} setAlert={setAlertModel} placeHolder="Введите название модели" attentionFlag={true}/>
            </div>
            <button className="add-car-step1__add-img-btn" onClick={openFileInput}>Добавить фото</button>
            <InputFileImages setImages={onSetImages}/>
            {images.length === 0 &&
                <h4 className="add-car-step1__images-empty">Выберете изображения для загрузки</h4>
            }
            <div className="add-car-step1__images">
                {images.map((el, i)=>{
                    return (
                        <ImgItem data={el} onRemoveImage={removeImage} key={i}/>
                    )
                })}
            </div>
        </div>
    )
}
