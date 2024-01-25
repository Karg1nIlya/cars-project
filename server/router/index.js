const Router = require('express').Router
const router = new Router()
const AuthController = require('../controllers/auth-controller')
const {body} = require('express-validator')
const CarController = require('../controllers/car-controller')
const { query } = require('express')

router.post('/registration', 
    body('login'),
    body('pswd').isLength({min:3, max: 32}),
    AuthController.registration)
router.post('/login', AuthController.login)
router.post('/logout', AuthController.logout)
router.get('/refresh', AuthController.refresh)
router.get('/get-cars', CarController.getCars)
router.post('/add-car', body('car'), CarController.addCar)

module.exports = router