const query = require('../helpers/query')
const gcsDelete = require('../helpers/gcsdelete')
const Music = require('../models/music');

class MusicController {
    static create(req, res, next) {
        const { title, artist, album } = req.body
        const id = req.decode.id
        const url = req.file.cloudStoragePublicUrl
        Music.create({ title, artist, album, url, owner: id})
            .then((music) => {
                res.status(201).json(music)
            })
            .catch(next);
    };
    static read(req, res, next) {
        let where = query(req.query)
        Music.find(where)
            .populate("owner")
            .then((musics) => {
                res.status(200).json(musics)
            })
            .catch(next);
    };

    static update(req, res, next) {
        const id = req.params.id
        const { title, artist, album } = req.body
        const url = req.file.cloudStoragePublicUrl
        Music.findById(id)
            .then(result => {
                gcsDelete(result.url)
                return Music.findByIdAndUpdate(id, { $set: { title, artist, album, url } }, { runValidators: true, new: true })
            })
            .then((music) => {
                res.status(200).json(music)
            }).catch(next);
    }

    static delete(req, res, next) {
        const id = req.params.id
        Music.findById(id)
            .then(result => {
                gcsDelete(result.url)
                return Music.findByIdAndDelete(id)
            })
            .then((music) => {
                res.status(200).json("Music deleted.")
            })
            .catch(next);
    };
};

module.exports = MusicController
