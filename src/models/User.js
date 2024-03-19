const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // Add other fields as needed
});

// Hashing the password before saving for security purposes. 
userSchema.pre('save', function (next) {
    if (this.isModified('password') || this.isNew) {
        bcrypt.hash(this.password, saltRounds, (err, hash) => {
            if (err) return next(err);
            this.password = hash;
            next();
        });
    } else {
        return next();
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
