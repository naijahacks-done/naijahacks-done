const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
var Schema = mongoose.Schema;

var UserSchema = Schema({
    _mac: { type: String, required: true },

    profileImage: { type: String},

    username: { type: String, required: true },

    full_name: { type: String },

    email: { type: String, required: true },

    password: { type: String, required: true },

    phone_no: { type: Schema.Types.Number, required: true },
    
    category: { type: String, required: true }

});

const User = module.exports = mongoose.model('Users', UserSchema);


module.exports.createUser = (newUser, callback) => {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

module.exports.getUserById = (id, callback) => {
    User.findById(id, callback);
}

module.exports.getUserByUsername = (username, callback) => {
    var query = { username: username };
    User.findOne(query, callback);
}

module.exports.comparePassword = (candidatePassword, hash, callback) => {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        callback(null, isMatch);
    });
}