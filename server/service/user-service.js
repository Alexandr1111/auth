const UserModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('./mail-service');
const tokenService = require('./token-service');
const UserDto = require('../dtos/user-dto');

const mongoose = require('mongoose');

class UserService {
    async registration(email, password) {
        const candidate = await UserModel.findOne({ email });

        // проверяем нет ли с таким email пользователя в бд
        if (candidate) {
            throw new Error(`Пользователь с почтовым адресом ${email} уже существует`);
        }

        // хэшируем пароль
        const hashPassword = await bcrypt.hash(password, 3);
        // делаем ссылку для активации
        const activationLink = uuid.v4();

        // сохраняем пользователя в бд
        const user = await UserModel.create({email, password: hashPassword});

        // если пользователь переходит сюда, то аккаунт isActive
        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);

        // генерируем токены, сохраняем refresh токен в бд
        const userDto = new UserDto(user);  // id, email, isActivated
        const tokens = tokenService.generateTokens({ ...userDto });
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto
        }
    }

    async activate(activationLink) {
        const user = await UserModel.findOne({ activationLink });
        if (!user) {
            throw new Error('Некорректная ссылка активации');
        }
        user.isActivated = true;
        await user.save();
    }
}

module.exports = new UserService();