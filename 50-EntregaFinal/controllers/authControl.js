const bcrypt = require('bcrypt');
const { config } = require('dotenv');
const saltRounds = bcrypt.genSaltSync(10);
const logger = require('./logControl').logger;

function checkPassword(passwordHash, passwordString) {
    return bcrypt.compareSync(passwordString, passwordHash)
}

function hashPassword(password) {
    return bcrypt.hashSync(password, saltRounds, null)
}

function isAuth(req, res, next) {
    logger.info('isauth en funcionamiento')
    if (req.isAuthenticated()) {
        req.session.save()
        next();
    } else {
        logger.error(`isAuth bloqueo una solicitud para ${req.originalUrl}`)
        res.redirect('/accounts/login');
    }
}

function isAdmin(userObj) {
    logger.info(`chequeando si ${userObj.username} es admin`)
    if ((userObj.username || userObj.email) == config.ADMIN_EMAIL || userObj.admin == true) {
        return true
    } else {
        return false
    }
}

exports.checkPassword = checkPassword;
exports.hashPassword = hashPassword;
exports.isAuth = isAuth;
exports.isAdmin = isAdmin;