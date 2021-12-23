class AutenticacaoService {
    logar(token) {
        localStorage.setItem("token", token);
    }

    deslogar() {
        localStorage.removeItem("token");
    }

    autenticado() { localStorage.getItem("token"); }
}

export { AutenticacaoService };