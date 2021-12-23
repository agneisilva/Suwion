const Receita = require('../models/receita').Receita;
const Ingrediente = require('../models/ingrediente').Ingrediente;

var ReceitaBusiness = class ReceitaBusiness {
    constructor({ receitaDao, ingredienteBusiness }) {
        this._dao = receitaDao;
        this._ingrediente = ingredienteBusiness;
    }

    buscarPorId(id) {
        return new Promise((res, rej) => {
            this._dao.buscarPorId(id)
                .then((receita) => {
                    //TODO melhorar occlusion data
                    receita.autor = receita.autor[0];
                    delete receita.autor.senha;
                    delete receita.autor.salt;
                    //Success
                    res(receita);
                })
                .catch((err) => {
                    //Error
                    rej("Erro ao Buscar Receita!");
                });
        });
    }

    cadastrar(receita, userId) {
        let cadastrosIngredientes = [];

        return new Promise(async (cadastrarRes, cadastrarRej) => {

            receita.ingredientes.forEach((ingrediente, idx, arr) => {
                if (!ingrediente._id) {
                    cadastrosIngredientes.push(
                        new Promise((res, rej) => {
                            //Verificar ingredientes nao cadastrados
                            this._ingrediente.buscar(ingrediente.descricao)
                                .then((ingredienteLocalizado) => {
                                    if (ingredienteLocalizado && ingredienteLocalizado._id){
                                        ingrediente._id = ingredienteLocalizado._id;
                                        res(ingrediente);
                                    }
                                    else if (!ingredienteLocalizado) {
                                        //Cadastrar ingredientes verificados
                                        this._ingrediente.cadastrar(new Ingrediente(ingrediente))
                                            .then(ingredienteCadastrado => {
                                                ingrediente._id = ingredienteCadastrado._id;
                                                res(ingrediente);
                                            })
                                            .catch(err => {
                                                throw (err);
                                            });
                                    }
                                })
                                .catch(err => {
                                    rej(err);
                                });
                        })
                    );
                } else {
                    cadastrosIngredientes.push(Promise.resolve(ingrediente));
                }
            });

            //Sobrescrevendo os ingredientes após garantir seu registro no banco
            const ingredientesFinais = await Promise.all(cadastrosIngredientes).catch(err=>{console.log(err)});

            receita.ingredientes = ingredientesFinais;
            receita.autor = userId;

            let receitaFinal = new Receita(receita);

            this._dao.cadastrar(receitaFinal)
                .then((data) => {
                    //Success
                    cadastrarRes(data);
                })
                .catch((err) => {
                    //Error
                    cadastrarRej("Erro ao Cadastrar Receita!");
                });
        });
    }

    filtrar(filtros) {
        //TODO implementar filtros avancados de receitas
        /*
            nome,
            tag,
            autor,
            nota,
            (pensar em mais filtros)
        */
        return new Promise((res, rej) => {
            this._dao.filtrar(filtros)
                .then((data) => {
                    //Success
                    res(data);
                })
                .catch((err) => {
                    //Error
                    rej("Erro ao Localizar Receitas!");
                });
        });
    }
}

exports.ReceitaBusiness = ReceitaBusiness;