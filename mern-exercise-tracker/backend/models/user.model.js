const mongoose = require('mongoose');

//require mongoose, then get new mongoose.schema
const Schema = mongoose.Schema;

//only has single field; username
//validations to username
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true, //trim white space of the end
    minlength: 3
  },
}, {
  timestamps: true, //automatically create fields for when username was created/modified
});

const User = mongoose.model('User', userSchema);

//export
module.exports = User;
