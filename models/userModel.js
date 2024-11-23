const mongoose = require( "mongoose" );

const UserSchema = new mongoose.Schema( {
  userName: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require : true,
  }
} );

const UserModel = mongoose.model( "UserModel", UserSchema );

module.exports = UserModel;
