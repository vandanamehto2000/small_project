const User = require ('../models/user.js');
const {StatusCodes} = require ('http-status-codes');
const bcrypt = require ('bcrypt');
const jwt = require ('jsonwebtoken');
const responseApi = require ('../utils/apiresponse.js');

const register = async (req, res) => {
  try {
    const {username, email, password, age, occupation} = req.body;
    if (!(username && email && password && age && occupation)) {
      return responseApi.successResponseWithData (
        res,
        'All input is required',
        StatusCodes.BAD_REQUEST
      );
    }
    let encryptedPassword = await bcrypt.hash (password, 10);
    const body = req.body;

    const newUser = {
      username: body.username,
      email: body.email,
      password: encryptedPassword,
      age: body.age,
      occupation: body.occupation,
    };
    let userData = await User.create (newUser);
    return responseApi.successResponseWithData (
      res,
      'User created successfully',
      userData,
      StatusCodes.CREATED
    );
  } catch (error) {
    error.code === 11000
      ? responseApi.ErrorResponse (
          res,
          'User Already Registered',
          req.body.email,
          StatusCodes.CONFLICT
        )
      : responseApi.ErrorResponse (
          res,
          'error',
          error.message ? error.message : error
        );
  }
};

const login = async (req, res) => {
  try {
    const {email, password} = req.body;
    if (!(email && password)) {
      return responseApi.successResponseWithData (
        res,
        'All input is required',
        StatusCodes.BAD_REQUEST
      );
    }
    const user = await User.findOne ({email});
    if (!user) {
      return responseApi.ErrorResponse (
        res,
        'email is incorrect',
        req.body.email,
        StatusCodes.BAD_REQUEST
      );
    }
    const isPasswordValid = await bcrypt.compare (password, user.password);
    if (isPasswordValid) {
      const token = jwt.sign (
        {
          userId: user._id,
          username: user.username,
          email: user.email,
          age: user.age,
          occupation: user.occupation,
        },
        process.env.SECRETKEY,
        {expiresIn: '1h'}
      );
      return responseApi.successResponseWithData (
        res,
        'User login successfully',
        {token: token},
        StatusCodes.OK
      );
    } else {
      return responseApi.ErrorResponse (
        res,
        'Password entered is incorrect',
        req.body.passwoord,
        StatusCodes.BAD_REQUEST
      );
    }
  } catch (error) {
    return responseApi.ErrorResponse (
      res,
      'error',
      error.message ? error.message : error
    );
  }
};

const profile = async (req, res) => {
  try {
    let user_id = req.auth.userId;
    const user = await User.findById (user_id);

    if (!user) {
      return responseApi.ErrorResponse (
        res,
        'user not found',
        [],
        StatusCodes.NOT_FOUND
      );
    }
    return responseApi.successResponseWithData (
      res,
      'profile details',
      {
        userId: user.user_id,
        username: user.username,
        email: user.email,
        age: user.age,
        occupation: user.occupation,
      },
      StatusCodes.OK
    );
  } catch (error) {
    return responseApi.ErrorResponse (
      res,
      'error',
      error.message ? error.message : error
    );
  }
};

module.exports = {
  register,
  login,
  profile,
};
