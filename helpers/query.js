module.exports = function ({ q }) {
    let where = {}
    if (q) where.$or = [{ title: new RegExp(q, 'gi') }, { artist: new RegExp(q, 'gi') }, { album: new RegExp(q, 'gi') }]
    return where
}