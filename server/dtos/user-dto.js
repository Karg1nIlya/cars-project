module.exports = class UserDto {
    id
    login

    constructor(model) {
        this.login = model.login
        this.id = model.id_user
    }
}