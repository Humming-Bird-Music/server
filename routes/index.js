const Router = require('express').Router();

const music = require('./music')
const user = require('./user')

// * Server Test
Router.get('/', (req, res) => res.status(200).json({ message: "connected to server" }))

// * Routes

Router.use('/users', user)
Router.use('/musics', music)

module.exports = Router;