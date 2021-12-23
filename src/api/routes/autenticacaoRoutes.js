const { logarUsuarioRules, validate } = require('../business/validacoes/usuarioValidacao');
const { responseHandle } = require('../infra/createResponse.js');
const UsuarioBusiness = require('../business/usuarioBusiness.js').UsuarioBusiness;

var AutenticacaoRoutes = class AutenticacaoRoutes {
    constructor(application) {
        this._application = application;
    }

    registrarRotas() {

        this._application.post('/login', logarUsuarioRules(), validate, (req, resp) => {
            this._userBusiness = new UsuarioBusiness(req.container.cradle);
            var promise = this._userBusiness.autenticar(req.body);
            responseHandle(resp, promise);
        });
    }
}


exports.AutenticacaoRoutes = AutenticacaoRoutes;