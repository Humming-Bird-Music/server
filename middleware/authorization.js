const Music = require('../models/music')

module.exports = (req, res, next) => {
    const musicId = req.params.id
    const userId = req.decode.id
    Music.findById(musicId)
        .then((music) => {
            if (music) {
                if (music.owner == userId) {
                    next()
                } else {
                    next({ status: 403, message: "You do not have permission to access this file." })
                }
            } else {
                next({ status: 404, message: "There's no music with such id" })
            }
        }).catch(next);
}