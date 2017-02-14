module.exports = function (req, res, next) {
    if(!req.user) {
        req.flash('error','You need to be logged in first!')
        res.redirect('/login');
        return
    }

    next()
}