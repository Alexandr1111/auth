const Router = require('express').Router;
const userController = require('../controllers/user-controller');

const router = new Router();

router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.post('/logout', userController.logout); // refresh удаляется из БД
router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh); // перезапись access, если он умер
router.get('/users', userController.getUsers); // тестовый(только для авторизованных юзеров)

module.exports = router;