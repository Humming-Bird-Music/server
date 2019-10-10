const Router = require('express').Router(),
    MusicController = require('../controllers/music'),
    multer = require('../middleware/multer'),
    gcs = require('../middleware/gcs'),
    authentication = require('../middleware/authentication'),
    authorization = require('../middleware/authorization')


Router.get('/', MusicController.read)

Router.use(authentication)
Router.post('/', multer.single('music'), gcs, MusicController.create)

Router.use('/:id', authorization)
Router.put('/:id', MusicController.update)
Router.delete('/:id', MusicController.delete)

module.exports = Router;
