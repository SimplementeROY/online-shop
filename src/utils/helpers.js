const jwt = require('jsonwebtoken');

exports.createToken = (usuario) => {
    const data = {
        usuario_id: usuario.id,
        usuario_role: usuario.role,
    }
    return jwt.sign(data, 'en un lugar de la mancha');
}

