const Router = require('express').Router(),
    MusicController = require('../controllers/music'),
    multer = require('../middleware/multer'),
    gcs = require('../middleware/gcs'),
    authentication = require('../middleware/authentication')

Router.use(authentication)
Router.post('/', multer.single('music'), gcs, MusicController.create)
Router.get('/', MusicController.read)
Router.put('/:id',multer.single('music'), gcs, MusicController.update)
Router.delete('/:id', MusicController.delete)

module.exports = Router;
