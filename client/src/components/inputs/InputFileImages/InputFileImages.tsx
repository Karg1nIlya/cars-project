import React from "react";
import "./inputFileImages.css";
import { IImage } from "../../../models/IImage";

interface IInputFileImages {
    setImages: (images: IImage|[]) => void
}

export function InputFileImages({setImages}: IInputFileImages) {

    const changeInputHandler = (event: React.FormEvent<HTMLInputElement>)=> {
        if(!event.currentTarget.files!.length) {
            return;
        }

        const files = Array.from(event.currentTarget.files as FileList);
        setImages([]);

        files.forEach(file => {
            const reader = new FileReader;
            reader.onload = ev => {
                if(file.type==='image/svg' || file.type==='image/png' || file.type==='image/jpeg') {
                    const imgTmp: IImage = {
                        name_img: file.name,
                        src: ev.target!.result as string,
                        size_img: file.size
                    };
                    setImages(imgTmp);
                }
                
            }

            reader.readAsDataURL(file);
        }); 
    };

    return (
        <input type="file" id="input-file" accept=".svg, .png, .jpeg" multiple={true} onChange={changeInputHandler}/>
    )
}