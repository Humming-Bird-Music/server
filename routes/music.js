const Router = require('express').Router(),
    MusicController = require('../controllers/music')

Router.post('/', MusicController.create)
Router.get('/', MusicController.read)
Router.put('/:id', MusicController.update)
Router.delete('/:id', MusicController.delete)

module.exports = Router;
