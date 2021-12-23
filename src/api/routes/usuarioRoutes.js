const { verifyJWT } = require('../infra/securityExtension');
const Usuario = require('../models/usuario').Usuario;
const UsuarioBusiness = require('../business/usuarioBusiness.js').UsuarioBusiness;
const { responseHandle } = require('../infra/createResponse.js');
const {
    criarUsuarioRules,
    alterarUsuarioRules,
    deletarUsuarioRules,
    validate
} = require('../business/validacoes/usuarioValidacao');

var UsuarioRoutes = class UsuarioRoutes {
    constructor(app) {
        this._application = app;
    }

    registrarRotas() {
        this._application.get('/usuario/:id', verifyJWT, (req, resp) => {
            this._userBusiness = new UsuarioBusiness(req.container.cradle);
            var promise = this._userBusiness.buscarPorId(req.params.id);
            responseHandle(resp, promise);
        })

        this._application.get('/usuario/email/:email', verifyJWT, (req, resp) => {
            this._userBusiness = new UsuarioBusiness(req.container.cradle);
            var promise = this._userBusiness.buscarPorEmail(req.params.email);
            responseHandle(resp, promise);
        })

        this._application.get('/usuario/nickname/:nickname', verifyJWT, (req, resp) => {
            this._userBusiness = new UsuarioBusiness(req.container.cradle);
            var promise = this._userBusiness.buscarPorNickName(req.params.nickname);
            responseHandle(resp, promise);
        })

        this._application.get('/usuarios/nickname/:nickname', verifyJWT, (req, resp) => {
            this._userBusiness = new UsuarioBusiness(req.container.cradle);
            var promise = this._userBusiness.listarPorNickName(req.params.nickname);
            responseHandle(resp, promise);
        })

        this._application.post('/usuario/', criarUsuarioRules(), validate, (req, resp) => {
            this._userBusiness = new UsuarioBusiness(req.container.cradle);
            var promise = this._userBusiness.cadastrar(new Usuario(req.body));
            responseHandle(resp, promise);
        })

        this._application.put('/usuario/', alterarUsuarioRules(), validate, verifyJWT, (req, resp) => {
            this._userBusiness = new UsuarioBusiness(req.container.cradle);
            var promise = this._userBusiness.alterar(new Usuario(req.body));
            responseHandle(resp, promise);
        })

        this._application.delete('/usuario', deletarUsuarioRules(), validate, verifyJWT, (req, resp) => {
            this._userBusiness = new UsuarioBusiness(req.container.cradle);
            var promise = this._userBusiness.deletar(req.usuarioId);
            responseHandle(resp, promise);
        });
    }
}

exports.UsuarioRoutes = UsuarioRoutes;