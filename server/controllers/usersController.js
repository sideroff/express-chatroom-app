let links = {
    guest: {
        headerLinks: [
            {href:'/', text:'Home'}]},
    user: { 
        headerLinks: [
            {href:'/', text:'Home'},
            {href:'/rooms', text:'All rooms'},
            {href:'/profile', text:'My Profile'}]}
}

module.exports = {
    login : (req,res) => {
        res.render('loginForm',links.guest)
    }
}