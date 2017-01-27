let crypto = require('crypto')
let Buffer = crypto.Buffer
module.exports = {
    generateSalt: function () {
        return crypto.randomBytes(128).toString('base64')
    },
    generatePasswordHash: function (salt, password)  {
        return crypto.createHash('sha256').update(password).digest("hex"); 
    }
}