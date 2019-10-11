const query = require('../helpers/query')
const gcsDelete = require('../helpers/gcsdelete')
const Music = require('../models/music');

class MusicController {
    static create(req, res, next) {
        if (!req.file) return next({ status: 400, message: "Music must be set" })
        const { title, artist, album } = req.body
        const id = req.decode.id
        const url = req.file.cloudStoragePublicUrl
        Music.create({ title, artist, album, url, owner: id })
            .then((music) => {
                res.status(201).json(music)
            })
            .catch(next);
    };
    static read(req, res, next) {
        let where = query(req.query)
        Music.find(where)
            .populate("owner", "-password")
            .then((musics) => {
                res.status(200).json(musics)
            })
            .catch(next);
    };

    static update(req, res, next) {
        const id = req.params.id
        const { title, artist, album } = req.body
        let up = { title, artist, album }
        Music.findByIdAndUpdate(id, { $set: up }, { runValidators: true, new: true })
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
