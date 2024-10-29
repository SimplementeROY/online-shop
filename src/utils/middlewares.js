const jwt = require('jsonwebtoken');
const { selectUsuarioById } = require('../controllers/users.controller');

exports.checkToken = async (req, res, next) => {
    // Comprobar si el token viene incluido en la cabecera Authorization
    if (!req.headers['authorization']) {
        return res.status(403).json({ message: 'Es necesario incluir el token de autorización' });
    }

    const token = req.headers['authorization'];

    // Comprobar si el token es correcto
    // TODO: Mover la clave al fichero de entorno
    let data;
    try {
        data = jwt.verify(token, 'en un lugar de la mancha');
    } catch (error) {
        return res.status(403).json({ message: 'El token de autenticación es incorrecto' });
    }

    // Recupero el usuario
    const usuario = await selectUsuarioById(data.usuario_id).populate('cart');

    // El usuario no existe
    if (!usuario) {
        return res.status(403).json({ message: 'El usuario no existe' });
    }

    // Colocamos el usuario dentro de la petición
    req.user = usuario;

    next();
}