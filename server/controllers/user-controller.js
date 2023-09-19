const userService = require('../service/user-service');

class UserController {
    async registration(req, res, next) {
        try {
            const { email, password } = req.body;
            const userData = await userService.registration(email, password);

            // 30 дней живёт как и токен и нельзя читать из js на клиенте
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30*24*60*60*1000, httpOnly: true });

            // возвращает токены и информацию о пользователе, -> возвращаем на клиент
            return res.json(userData);
        }
        catch (e) {
            console.log(e);
        }
    }

    async login(req, res, next) {
        try {

        }
        catch (e) {

        }
    }

    async logout(req, res, next) {
        try {

        }
        catch (e) {

        }
    }

    async activate(req, res, next) {
        try {
            const activationLink = req.params.link;
            await userService.activate(activationLink);
            return res.redirect(process.env.CLIENT_URL);
        }
        catch (e) {
            console.log(e);
        }
    }

    async refresh(req, res, next) {
        try {

        }
        catch (e) {

        }
    }

    async getUsers(req, res, next) {
        try {
            res.json(['123', '456']);
        }
        catch (e) {

        }
    }
}

module.exports = new UserController();