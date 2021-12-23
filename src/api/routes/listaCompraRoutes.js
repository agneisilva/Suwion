const { verifyJWT } = require('../infra/securityExtension');
const { responseHandle } = require('../infra/createResponse.js');
const ListaCompraBusiness = require('../business/ListaCompraBusiness.js').ListaCompraBusiness;

var ListaCompraRoutes = class ListaCompraRoutes {
    constructor(application) {
        this._application = application;
    }

    registrarRotas() {
        this._application.post('/listaCompra/receita', verifyJWT, (req, resp) => {
            this._business = new ListaCompraBusiness(req.container.cradle);
            var promise = this._business.criarPorReceita(req.body)
            responseHandle(resp, promise);
        });

        this._application.post('/listaCompra/cardapio', verifyJWT, (req, resp) => {
            this._business = new ListaCompraBusiness(req.container.cradle);
            var promise = this._business.criarPorCardapio(req.body);
            responseHandle(resp, promise);
        });
    }
}


exports.ListaCompraRoutes = ListaCompraRoutes;