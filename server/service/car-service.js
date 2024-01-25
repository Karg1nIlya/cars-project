const pool = require("../config/database")
const ApiError = require('../exceptions/api-error')
const TokenService = require('./token-service')

async function getImages(id_car) {
    const res = (await pool.query(`select * from images where id_car=${id_car}`)).rows
    return res
}

class CarService {

    async getCars(page, limit) {
        const cars = (await pool.query(`select * from cars order by id_car limit ${limit} offset ${(page-1)*limit}`)).rows
        if(cars.length!==0) {
            const carsRes = []
            for(let i=0; i<cars.length; i++) {
                const imgs = await getImages(cars[i].id_car)
                carsRes.push({...cars[i], imgs: imgs})
            }
            return carsRes
        } else {
            return []
        }
    }

    async addCar(car, refreshToken) {
        if(!refreshToken) {
            throw ApiError.UnauthorizedError()
        }
        const userData = TokenService.validationRefreshToken(refreshToken)
        if(!userData) {
            throw ApiError.UnauthorizedError()
        }
        const id_user = userData.id
        let id_car = (await pool.query(`SELECT MAX("id_car") FROM "cars"`)).rows[0].max
        var id_image = (await pool.query(`SELECT MAX("id_image") FROM "images"`)).rows[0].max
        if(!id_image) {
            id_image = 1
        } else {
            id_image++
        }
        if(!id_car) {
            id_car = 1
        } else {
            id_car++
        }
        
        // console.log(`insert into cars values(${id_car}, ${id_user}, '${car.brand}', '${car.model}', '${car.color}', ${car.price},'${car.year_release}', '${car.motor}', '${car.transmission}', ${car.power_reserve})`)
        const carRes = await pool.query(`insert into cars values(${id_car}, ${id_user}, '${car.brand}', '${car.model}', '${car.color}', ${car.price},'${car.year_release}', '${car.motor}', '${car.transmission}', ${car.power_reserve})`)
        const images = car.imgs
        images.forEach( async el => {
            await pool.query(`insert into images values(${id_image++}, ${id_car}, '${el.src}')`)          
        })
        let imagesFromDB = await getImages(id_car)
        const carTmp = {
            id_car: id_car,
            id_user: id_user,
            brand: car.brand,
            model: car.model,
            color: car.color,
            price: car.price,
            year_release: car.year_release,
            motor: car.motor,
            transmission: car.transmission,
            power_reserve: car.power_reserve,
            imgs: imagesFromDB
        }
        return carTmp
    }
}

module.exports = new CarService