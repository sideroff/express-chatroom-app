module.exports = function (req, res, next) {
    if(!req.user) {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ error: 'You need to be logged in!' }));
        return
    }

    next()
}