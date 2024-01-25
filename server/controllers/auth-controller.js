const AuthService = require('../service/auth-service')
const {validationResult} = require('express-validator')
const ApiError = require('../exceptions/api-error')

class AuthController {

    async login(req, res, next) {
        try {
            const {login, password} = req.body
            const userData = await AuthService.login(login, password)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true})
            return res.json(userData)
        } catch (error) {
            next(error)
        }
    }

    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies
            const token = await AuthService.logout(refreshToken)
            res.clearCookie('refreshToken')
            return res.json(token)
        } catch (error) {
            next(error)
        }
    }


    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies
            const userData = await AuthService.refresh(refreshToken)
            // console.log(userData)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true})
            return res.json(userData)
        } catch (error) {
            next(error)
        }
    }

    async registration(req, res, next) {
        try {
            // console.log(req)
            const errors = validationResult(req)
            
            if(errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
            }
 
            const {login, password} = req.body
            const userData = await AuthService.registration(login, password)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true})
            return res.json(userData)
        } catch (error) {
            next(error)
        }
    }
}


module.exports = new AuthController()