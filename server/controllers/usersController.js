module.exports = {
    login : (req,res) => {
        res.render('loginForm')
    },
    register: (req,res) => {
        res.render('registerForm')
    }
}