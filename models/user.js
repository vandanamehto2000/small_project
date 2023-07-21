const mongoose = require ('mongoose');

const userSchema = new mongoose.Schema (
  {
    username: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
      validate: {
        validator: function (v) {
          return /^[A-Za-z]+$/.test (v);
        },
        message: 'Username should contain only alphabets',
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          return /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test (v);
        },
        message: 'Invalid email format',
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      validate: {
        validator: function (v) {
          return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]+$/.test (
            v
          );
        },
        message: 'Password should contain at least one uppercase letter, one lowercase letter, and one special character',
      },
    },
    age: {
      type: Number,
      required: true,
      min: 0,
      max: 150,
    },
    occupation: {
      type: String,
      required: true,
    },
  },
  {timestamps: true}
);

const User = mongoose.model ('User', userSchema);

module.exports = User;
