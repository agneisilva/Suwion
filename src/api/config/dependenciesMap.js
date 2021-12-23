const { createContainer, asClass, asFunction, asValue, Lifetime  } = require('awilix');

const UsuarioDAO = require('../dao/usuarioDAO.js').UsuarioDAO;
const UsuarioBusiness = require('../business/usuarioBusiness.js').UsuarioBusiness;

const ReceitaDAO = require('../dao/receitaDAO.js').ReceitaDAO;
const ReceitaBusiness = require('../business/receitaBusiness.js').ReceitaBusiness;

const ListaCompraDAO = require('../dao/listaCompraDAO.js').ListaCompraDAO;
const ListaCompraBusiness = require('../business/listaCompraBusiness.js').ListaCompraBusiness;

const IngredienteDAO = require('../dao/ingredienteDAO.js').IngredienteDAO;
const IngredienteBusiness = require('../business/ingredienteBusiness.js').IngredienteBusiness;

const CardapioDAO = require('../dao/cardapioDAO.js').CardapioDAO;
const CardapioBusiness = require('../business/cardapioBusiness.js').CardapioBusiness;

const container = createContainer()

container.register({
  userDao: asClass(UsuarioDAO).scoped(),
  userBusiness: asClass(UsuarioBusiness).scoped(),

  receitaDao: asClass(ReceitaDAO).scoped(),
  receitaBusiness: asClass(ReceitaBusiness).scoped(),

  ristaCompraDao: asClass(ListaCompraDAO).scoped(),
  listaCompraBusiness: asClass(ListaCompraBusiness).scoped(),

  ingredienteDao: asClass(IngredienteDAO).scoped(),
  ingredienteBusiness: asClass(IngredienteBusiness).scoped(),

  cardapioDao: asClass(CardapioDAO).scoped(),
  cardapioBusiness: asClass(CardapioBusiness).scoped(),
});

var containerMiddleware = () => {

  return (req, res, next) => {

    req.container = container.createScope();

    req.container.register({
      connection: asValue(req["db"]),
      usuarioId: asValue(req.usuarioId),
    })

    next();
  }
};

module.exports = containerMiddleware;