const jwt = require('jsonwebtoken');
var crypto = require('crypto');

var verifyJWT = function (req, res, next) {

    var token = req.headers['authorization'];

    const naoAutorizadoMsg = 'Não autorizado';

    if(!token || !(typeof token === 'string') || !token.toString().includes("Bearer "))
        return res.status(401).send({ auth: false, message: naoAutorizadoMsg });
    
    token = token && token.split(' ')[1];

    jwt.verify(token, (process.env.SECRET || "QwErT654"), function (err, decoded) {
        if (err) return res.status(401).send({ auth: false, message: naoAutorizadoMsg });

        req.usuarioId = decoded.usuarioId;

        next();
    });

    next();
}

/**
 * generates random string of characters i.e salt
 * @function
 * @param {number} length - Length of the random string.
 */
var genRandomString = function (length) {
    return crypto.randomBytes(Math.ceil(length / 2))
        .toString('hex') /** convert to hexadecimal format */
        .slice(0, length);   /** return required number of characters */
};


/**
 * hash password with sha512.
 * @function
 * @param {string} password - List of required fields.
 * @param {string} salt - Data to be validated.
 */
var sha512 = function (password, salt) {
    var hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
    hash.update(password);
    return hash.digest('hex');
};

exports.verifyJWT = verifyJWT;
exports.genRandomString = genRandomString;
exports.sha512 = sha512;