const ApiError = require('../exceptions/api-error');

module.exports = function (err, req, res, next) {
    console.log(err);
    if (err instanceof ApiError) {
        return res.status(err.status).json({ message: err.message, errors: err.errors });
    }

    // Если условие не выполнилось, значит ошибку не предусмотрел
    return res.status(500).json({ message: 'Непредвиненная ошибка' });
}