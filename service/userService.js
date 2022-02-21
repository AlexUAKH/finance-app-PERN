const { User } = require("../models/models");
const bcrypt = require("bcrypt");
const TokenService = require("./tokenService");
const UserDTO = require("../DTOs/userDTO");
const ApiError = require("../error/apiErrors");

class UserService {
  async registration(email, password) {
    const checkUser = await User.findOne({ where: { email } });
    if (checkUser) {
      throw ApiError.badRequest(`User ${email} already exist`);
    }
    const hashPassword = await bcrypt.hash(password, 3);
    const name = email.split("@")[0];
    const user = await User.create({
      email,
      password: hashPassword,
      name,
      isMailConfermed: false
    });
    //
    // await Profile.create({
    //   userId: user.id,
    //   name
    // });

    const userDTO = new UserDTO(user);
    const tokens = TokenService.generateTokens({ ...userDTO });

    await TokenService.saveToken(userDTO.id, tokens.refreshToken);

    return { ...tokens, user: userDTO };
  }

  async login(email, password) {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw ApiError.badRequest(`User ${email} doesn't exist`)
    }

    let comparePassword = bcrypt.compareSync(password, user.password);

    if (!comparePassword) {
      throw ApiError.badRequest("Incorrect password")
    }
    const userDTO = new UserDTO(user);

    const tokens = TokenService.generateTokens({ ...userDTO });
    await TokenService.saveToken(userDTO.id, tokens.refreshToken);

    return { ...tokens, user: userDTO };
  }

  async logout(refreshToken) {
    return await TokenService.removeToken(refreshToken);
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.unauthorizedError();
    }
    const userData = TokenService.validateRefreshToken(refreshToken);
    const tokenFromDB = await TokenService.findToken(userData.id);
    // const tokenFromDB = await TokenService.findToken(refreshToken);
    if (!userData || !tokenFromDB) {
      throw ApiError.unauthorizedError();
    }
    const user = await User.findByPk(userData.id);
    const userDTO = new UserDTO(user);
    const tokens = TokenService.generateTokens({ ...userDTO });
    await TokenService.saveToken(userDTO.id, tokens.refreshToken);
    return { ...tokens, user: userDTO };
  }
}

module.exports = new UserService();
