const pool = require("../config/database")
const bcrypt = require('bcrypt')
const TokenService = require('./token-service')
const UserDto = require('../dtos/user-dto')
const ApiError = require('../exceptions/api-error')

class AuthService {

    async registration(login, password) {
        const candidates = await pool.query(`select * from users where login = '${login}'`)
        if(candidates.rows.length !== 0) {
            throw ApiError.BadRequest(`Пользователь с логином ${login} уже существует`)
        }
        if(password.length<3) {
            throw ApiError.BadRequest(`Пароль должен быть больше 3 символов`)
        }
        if(password.length>32) {
            throw ApiError.BadRequest(`Пароль должен быть меньше 32 символов`)
        }
        const hashPassword = await bcrypt.hash(password, 3)
        let id = (await pool.query(`SELECT MAX("id_user") FROM "users"`)).rows[0].max
        if(!id) {
            id = 1
        } else {
            id++
        }
        await pool.query(`INSERT INTO users VALUES (${id}, '${login}', '${hashPassword}')`)
        const user = {
            id_user: id,
            login: login,
        }
        // await mailService.sendActivationMail(login, `${process.env.API_URL}/api/activate/${activationLink}`)
        const userDto = new UserDto(user)
        const tokens = TokenService.generateTokens({...userDto})
        await TokenService.saveToken(userDto.id, tokens.refreshToken)
        // return hashPassword
        console.log({...tokens, user: userDto})
        return {...tokens, user: userDto}
    }

    async login(login, password) {
        const candidate = await pool.query(`select * from users where login = '${login}'`)
        if(candidate.rows.length === 0) {
            throw ApiError.BadRequest(`Пользователь с логином ${login} был не найден`)
        }
        const isPassEquals = await bcrypt.compare(password, candidate.rows[0].pswd) 
        if(!isPassEquals) {
            throw ApiError.BadRequest(`Неверный пароль`)
        }
        const userDto = new UserDto(candidate.rows[0])
        const tokens = TokenService.generateTokens({...userDto})
        await TokenService.saveToken(userDto.id, tokens.refreshToken)
        return {...tokens, user: userDto}
        // return {user: userDto}
    }

    async logout(refreshToken) {
        const token = await TokenService.removeToken(refreshToken)
        return token
    }

    async refresh(refreshToken) {
        if(!refreshToken) {
            throw ApiError.UnauthorizedError()
        }
        const userData = TokenService.validationRefreshToken(refreshToken)
        const tokenFromDb = await TokenService.findToken(refreshToken)
        if(!userData || !tokenFromDb.length === 0) {
            throw ApiError.UnauthorizedError()
        }
        const candidate = (await pool.query(`select * from users where id_user = ${tokenFromDb.id_user}`)).rows[0]
        const userDto = new UserDto(candidate)
        const tokens = TokenService.generateTokens({...userDto})
        await TokenService.saveToken(userDto.id, tokens.refreshToken)
        return {...tokens, user: userDto}
    }
}

module.exports = new AuthService