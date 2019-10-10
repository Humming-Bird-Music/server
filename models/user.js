'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema
const { hash } = require('../helpers/bcryptjs')

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username required.'],
        validate: {
            validator(username) {
                return new Promise((resolve, reject) => {
                    User.findOne({ username }).then(result => result ? resolve(false) : resolve(true))
                });
            },
            message: "Username is already taken."
        }
    },
    email: {
        type: String,
        required: [true, 'Email required.'],
        match: [/^(([^<>()\[\]\.,;:\s@"]+(\.[^<>()\[\]\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Invalid email format."],
        validate: {
            validator(email) {
                return new Promise((resolve, reject) => {
                    User.findOne({ email }).then(result => result ? resolve(false) : resolve(true))
                });
            },
            message: "Email is already taken."
        }
    },
    password: {
        type: String,
        required: [true, 'Password required.'],
    }
}, { timestamps: true })

userSchema.pre('save', function (next) {
    this.password = hash(this.password)
    next()
})

const User = mongoose.model('Users', userSchema)

module.exports = User