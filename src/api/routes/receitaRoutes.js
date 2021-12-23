const { verifyJWT } = require('../infra/securityExtension');
const { responseHandle } = require('../infra/createResponse.js');
const ReceitaBusiness = require('../business/receitaBusiness.js').ReceitaBusiness;
const {
    criarReceitaRules,
    validate
} = require('../business/validacoes/receitaValidacao.js');

var ReceitaRoutes = class ReceitaRoutes {
    constructor(app) {
        this._application = app;
    }

    registrarRotas() {
        this._application.get('/receita/:id', (req, resp) => {
            this._business = new ReceitaBusiness(req.container.cradle);
            var promise = this._business.buscarPorId(req.params.id);
            responseHandle(resp, promise);
        })

        this._application.post('/receita', criarReceitaRules(), validate, verifyJWT, (req, resp) => {
            this._business = new ReceitaBusiness(req.container.cradle);
            var promise = this._business.cadastrar(req.body, req.usuarioId);
            responseHandle(resp, promise);
        })

        this._application.post('/receitas/', (req, resp) => {
            this._business = new ReceitaBusiness(req.container.cradle);
            var promise = this._business.filtrar(req.body);
            responseHandle(resp, promise);
        })
    }
}

exports.ReceitaRoutes = ReceitaRoutes;