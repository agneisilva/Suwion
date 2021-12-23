const { genRandomString, sha512 } = require('../infra/securityExtension');
const jwt = require('jsonwebtoken');
const {Error, ErrorTipo} = require('../infra/error.js');

exports.UsuarioBusiness = class UsuarioBusiness {
    constructor({ userDao }) {
        this._userDao = userDao;
    }

    buscarPorId(usuarioId) {
        return new Promise((res, rej) => {
            this._userDao.buscarPorId(usuarioId)
                .then((data) => {
                    //Success
                    res(data);
                })
                .catch((err) => {
                    //Error
                    rej("Erro ao Buscar Usuário!");
                });
        });
    }

    buscarPorEmail(email) {
        return new Promise((res, rej) => {
            this._userDao.buscarPorEmail(email)
                .then((data) => {
                    //Success
                    res(data);
                })
                .catch((err) => {
                    //Error
                    rej("Erro ao Buscar Usuário!");
                });
        });
    }

    buscarPorNickName(nickName) {
        return new Promise((res, rej) => {
            this._userDao.buscarPorNickName(nickName)
                .then((data) => {
                    //Success
                    res(data);
                })
                .catch((err) => {
                    //Error
                    rej("Erro ao Buscar Usuário!");
                });
        });
    }

    listarPorNickName(nickName) {
        return new Promise((res, rej) => {
            this._userDao.listarPorNickName(nickName)
                .then((data) => {
                    //Success
                    res(data);
                })
                .catch((err) => {
                    //Error
                    rej("Erro ao Buscar Usuarios!");
                });
        });
    }

    cadastrar(usuario) {

        return new Promise(async (res, rej) => {
            try {
                const result = await Promise.all(
                    [
                        this.buscarPorNickName(usuario.nickName),
                        this.buscarPorEmail(usuario.email)
                    ])

                if (result[0] || result[1])
                    return rej(new Error( {status:422 , msg: "Usuário já cadastrado"}));

                usuario.salt = genRandomString(10);
                usuario.senha = sha512(usuario.senha, usuario.salt);

                this._userDao.cadastrar(usuario)
                    .then((data) => {
                        res({ Id: data._id, NickName: data.nickName });
                    })
                    .catch((err) => {
                        rej("Erro ao Cadastrar Usuário!");
                    });
            } catch (error) {
                rej(error);
            }
        });
    }

    alterar(usuario) {
        return new Promise(async (res, rej) => {
            try {
                const usuarioExistente = await this.buscarPorId(usuario._id);

                if (!usuarioExistente)
                    return rej("Usuário não encontrado!");

                usuario.salt = genRandomString(10);
                usuario.senha = sha512(usuario.senha, usuario.salt);
                usuario.nickName = usuarioExistente.nickName;

                this._userDao.alterar(usuario)
                    .then((data) => {
                        res("Sucesso ao Alterar Usuário!");
                    })
                    .catch((err) => {
                        rej("Erro ao Alterar Usuário!");
                    });
            } catch (error) {
                rej(error);
            }
        });
    }

    deletar(usuarioId) {
        return new Promise(async (res, rej) => {
            try {
                var usuarioExistente = await this.buscarPorId(usuarioId);

                if (!usuarioExistente)
                    return rej("Usuário não encontrado!");

                this._userDao.deletar(usuarioId)
                    .then((data) => {
                        res("Sucesso ao Deletar Usuário!");
                    })
                    .catch((err) => {
                        rej("Erro ao Deletar Usuário!");
                    });
            } catch (error) {
                rej(error);
            }
        });
    }

    autenticar({login, senha}) {
        return new Promise(async (res, rej) => {

            try {
                var usuario = await this.buscarPorNickName(login);

                if (!usuario)
                    return rej("Usuário não encontrado");

                var hashreq = sha512(senha, usuario.salt);

                if (usuario.senha === hashreq) {
                    const token = jwt.sign(
                        { usuarioId: usuario._id },
                        process.env.SECRET || "QwErT654",
                        { expiresIn: process.env.SUWION_JWT_EXPIRESIN || '86400s' /*24horas*/ });

                    res(token);
                }
                else {
                    rej(new Error({tipo: ErrorTipo.Authentication}));
                }


            } catch (error) {
                rej()
            }
        });
    }
}

// exports.UsuarioBusiness = UsuarioBusiness