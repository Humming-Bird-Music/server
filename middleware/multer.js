const Multer = require('multer')

module.exports = Multer({
    storage: Multer.memoryStorage,
    limits: {
        fileSize: 1024 * 1024 * 20
    }
})