const passport = require('passport')
const LocalPassport = require('passport-local')

module.exports = () => {
    passport.use(new LocalPassport((username, password, done) => {

    }))
}