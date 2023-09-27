const ApiError = require("../exceptions/api-error");
const tokenService = require("../service/token-service");

// next вызывает следующий в цепочке миддлвар
module.exports = function (req, res, next) {
    try {
        // вытаскиваю токен из заголовка
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return next(ApiError.UnauthorizedError());
        }

        const accessToken = authorizationHeader.split(' ')[1];
        if (!accessToken) {
            return next(ApiError.UnauthorizedError());
        }

        const userData = tokenService.validateAccessToken(accessToken);
        if (!userData) {
            return next(ApiError.UnauthorizedError());
        }

        req.user = userData;
        next();
    } catch (e) {
        console.log('eeeee', e)
        return next(ApiError.UnauthorizedError());
    }
}