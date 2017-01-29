
module.exports = {
    index: (req,res) => {
        let messages = req.session.messages
        req.session.messages = null
        console.log(req.user) 
        res.render('index',{messages: messages})
    }    
}