const { verifyJWT } = require('../infra/securityExtension');
const Ingrediente = require('../models/ingrediente').Ingrediente;
const IngredienteBusiness = require('../business/ingredienteBusiness.js').IngredienteBusiness;
const { responseHandle } = require('../infra/createResponse.js');
const {
    criarIngredienteRules,
    alterarIngredienteRules,
    deletarIngredienteRules,
    validate
} = require('../business/validacoes/ingredienteValidacao');

var IngredienteRoutes = class IngredienteRoutes {
    constructor(app) {
        this._application = app;
    }

    registrarRotas() {
        this._application.get('/ingrediente/:id', verifyJWT, (req, resp) => {
            this._business = new IngredienteBusiness(req.container.cradle);
            var promise = this._business.buscarPorId(req.params.id)
            responseHandle(resp, promise);
        })

        this._application.get('/ingredientes/:descricao', verifyJWT, (req, resp) => {
            this._business = new IngredienteBusiness(req.container.cradle);
            var promise = this._business.buscar(req.params.descricao)
            responseHandle(resp, promise);
        })

        this._application.post('/ingredientes', verifyJWT, (req, resp) => {
            this._business = new IngredienteBusiness(req.container.cradle);
            var promise = this._business.listar(req.body)
            responseHandle(resp, promise);
        })

        this._application.post('/ingrediente', criarIngredienteRules(), validate, verifyJWT, (req, resp) => {
            this._business = new IngredienteBusiness(req.container.cradle);
            var promise = this._business.cadastrar(new Ingrediente(req.body))
            responseHandle(resp, promise);
        })

        this._application.post('/ingredientes/autocomplete', (req, resp)=>{
            this._business = new IngredienteBusiness(req.container.cradle);
            var promise = this._business.buscarAutoComplete(req.body.descricao)
            responseHandle(resp, promise);
        })

        this._application.put('/ingrediente', alterarIngredienteRules(), validate, verifyJWT, (req, resp) => {
            this._business = new IngredienteBusiness(req.container.cradle);
            var promise = this._business.alterar(new Ingrediente(req.body));
            responseHandle(resp, promise);
        })

        this._application.delete('/ingrediente', deletarIngredienteRules(), validate, verifyJWT, (req, resp) => {
            this._business = new IngredienteBusiness(req.container.cradle);
            var promise = this._business.deletar(req.body.ingredienteId);
            responseHandle(resp, promise);
        })
    }
}

exports.IngredienteRoutes = IngredienteRoutes;