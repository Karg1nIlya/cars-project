const jwt = require('jsonwebtoken')
const pool = require("../config/database")

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn:'30m'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn:'30d'})
        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(userId, refreshToken) {
        //при входе тогоже самого пользователья, но с другого устройства, token просто будет перезаписываться
        const tokenData = await pool.query(`select refreshToken from tokens where id_user = ${userId}`)
        //здесь перезаписываем token в БД (пока не сделал) 
        if(tokenData.rows.length !== 0) {
            await pool.query(`update tokens set refreshToken = '${refreshToken}' where id_user = ${userId}`)
            tokenData.rows[0].refreshToken = refreshToken
            return tokenData.rows[0]
        }
        // здесь создаем новый token и возвращаем его (пока не сделал)
        let id = (await pool.query(`SELECT MAX("id_token") FROM "tokens"`)).rows[0].max
        if(!id) {
            id = 1
        } else {
            id++
        }
        const token = await pool.query(`insert into tokens values(${id}, '${refreshToken}', ${userId})`)
        return token.rows[0]
    }

    async removeToken(refreshToken) {
        const token = await pool.query(`delete from tokens where refreshToken = '${refreshToken}'`)
        return token
    }

    validationAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
            return userData
        } catch (error) {
            return null
        }
    }

    validationRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
            return userData
        } catch (error) {
            return null
        }
    }

    async findToken(refreshToken) {
        const tokenData = await pool.query(`select * from tokens where refreshToken = '${refreshToken}'`)
        return tokenData.rows[0] 
    }
}

module.exports = new TokenService