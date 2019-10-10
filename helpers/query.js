module.exports = function ({ q }) {
    let where = {}
    if (q) where.$or = [{ title: { $reqex: q } }, { artist: { $reqex: q } }, { album: { $reqex: q } }]
    return where
}