let path = require('path')
let express = require('express')

module.exports = (config, app) => {
    app.set('view engine','pug')
    app.set('views',path.join(config.rootPath, '/content/views'))
    app.use(express.static(path.join(config.rootPath, 'public')))
}
