import { ICar } from "../models/ICars";

export const sortCars = (arr: ICar[], param: string) => {
    let resArr: ICar[] = []
    switch (param) {
        case 'времени добавления': {
            resArr = arr.sort((a, b)=>a.id_car!-b.id_car!)
            break
        }
            
        case 'возрастанию цены': {
            resArr = arr.sort((a, b)=>a.price-b.price)
            break
        }
        
        case 'убыванию цены': {
            resArr = arr.sort((a, b)=>b.price-a.price)
            break
        }

        case 'возрастанию года выпуска': {
            resArr = arr.sort((a, b)=>Number(a.year_release.split('-')[0])-Number(b.year_release.split('-')[0]))
            break
        }

        case 'убыванию года выпуска': {
            resArr = arr.sort((a, b)=>Number(b.year_release.split('-')[0])-Number(a.year_release.split('-')[0]))
            break
        }
    
        default: {
            resArr = arr
            break
        }
            
    }

    return resArr
}

export const filterCars = (arr: ICar[], param: string, str: string) => {
    let resArr: ICar[] = []
    switch (param) {
        case 'марке': {
            if(str !== '') {
                resArr = arr.filter(el=>{
                    if(el.brand.toLocaleLowerCase().includes(str.toLocaleLowerCase())) {
                        return el
                    }
                })
            }
            break
        }
            
        case 'цвету': {
            if(str !== '') {
                resArr = arr.filter(el=>{
                    if(el.color.toLocaleLowerCase().includes(str.toLocaleLowerCase())) {
                        return el
                    }
                })
            }
            break
        }
    
        default: {
            resArr = arr
            break
        }   
    }

    return resArr
}
