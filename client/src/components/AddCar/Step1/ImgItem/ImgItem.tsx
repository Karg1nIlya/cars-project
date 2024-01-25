import React from "react";
import "./imgItem.css";
import { IImage } from "../../../../models/IImage";

interface IImgItem {
    data: IImage;
    onRemoveImage: (src: string)=>void
}

export function ImgItem({data, onRemoveImage}: IImgItem) {

    function bytesToSize(bytes: number) {
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
        if (!bytes) {
          return '0 Byte'
        }
        const i = parseInt(String(Math.floor(Math.log(bytes) / Math.log(1024))))
        return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i]
      }
    
    const removeImage = () => {
        onRemoveImage(data.src)
    }

    return (
        <div className="img-item-preview">
            <div className="img-item-preview__remove" onClick={removeImage}>&times;</div>
            <img className="img-item-preview__img" src={data.src} />
            <div className="img-item-preview__info">
                <div className="img-item-preview__title">{data.name_img}</div>
                <div className="img-item-preview__size">{bytesToSize(data.size_img)}</div>
            </div>
        </div>
    )
}