const emailController = require('../controllers/emailController')

function initRoutes(app) {
    app.post('/send', emailController().send)
}

module.exports = initRoutes