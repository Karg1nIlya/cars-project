const ApiError = require('../exceptions/api-error')
const CarService = require('../service/car-service')

class CarController {
    async getCars(req, res, next) {
        try {
            const page = req.query.page
            const limit = req.query.limit
            const cars = await CarService.getCars(page, limit)
            return res.json(cars)
        } catch (error) {
            next(error)
        }
    }

    async addCar(req, res, next) {
        try {
            const {car} = req.body
            const {refreshToken} = req.cookies
            const carRes = await CarService.addCar(car, refreshToken)
            return res.json(carRes)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new CarController()