
module.exports = {
    index: (req,res) => {
        let messages = req.session.messages
        req.session.messages = null
        res.render('index',{messages: messages})
    }    
}