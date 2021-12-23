const { verifyJWT } = require('../infra/securityExtension');
const { responseHandle } = require('../infra/createResponse.js');
const CardapioBusiness = require('../business/cardapioBusiness.js').CardapioBusiness;


var CardapioRoutes = class CardapioRoutes {
    constructor(app) {
        this._application = app;
    }

    registrarRotas() {
        this._application.post('/cardapio/', verifyJWT, (req, resp) => {
            this._business = new CardapioBusiness(req.container.cradle);
            var promise = this._business.cadastrar(req.body);
            responseHandle(resp, promise);
        });

        this._application.post('/cardapios/', verifyJWT, (req, resp) => {
            this._business = new CardapioBusiness(req.container.cradle);
            var promise = this._business.filtrar(req.body);
            responseHandle(resp, promise);
        });
    }
}

exports.CardapioRoutes = CardapioRoutes;