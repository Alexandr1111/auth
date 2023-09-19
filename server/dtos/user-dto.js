module.exports = class UserDto {
    email;
    id;
    isActivated;

    constructor(model) {
        this.email = model.email;
        // mongoose добавляет _ к id
        this.id = model._id;
        this.isActivated = model.isActivated;
    }
}