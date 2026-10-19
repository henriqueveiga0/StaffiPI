import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import "./CadastroRisco.css";

function CadastroEpi() {
    return (
        <Layout>
            <div className="cadastro-risco-header">
                <div>
                    <Link to="/epis" className="voltar">
                        <i className="bi bi-arrow-left"></i>
                        Voltar
                    </Link>

                    <h1>Cadastrar EPI</h1>
                    <p>Registre um novo equipamento de proteção individual</p>
                </div>
            </div>

            <div className="cadastro-risco-card">
                <form className="cadastro-risco-form">

                    <div className="form-grupo">
                        <label htmlFor="nome">Nome do EPI</label>
                        <input
                            type="text"
                            id="nome"
                            placeholder="Ex: Capacete de segurança"
                        />
                    </div>

                    <div className="form-linha">
                        <div className="form-grupo">
                            <label htmlFor="categoria">Categoria</label>
                            <input
                                type="text"
                                id="categoria"
                                placeholder="Ex: Proteção da cabeça"
                            />
                        </div>

                        <div className="form-grupo">
                            <label htmlFor="quantidade">Quantidade</label>
                            <input
                                type="number"
                                id="quantidade"
                                min="0"
                                placeholder="Ex: 30"
                            />
                        </div>
                    </div>

                    <div className="form-linha">
                        <div className="form-grupo">
                            <label htmlFor="ca">Número do CA</label>
                            <input
                                type="text"
                                id="ca"
                                placeholder="Ex: 12345"
                            />
                        </div>

                        <div className="form-grupo">
                            <label htmlFor="validade">Validade</label>
                            <input
                                type="date"
                                id="validade"
                            />
                        </div>
                    </div>

                    <div className="form-grupo">
                        <label htmlFor="descricao">Descrição</label>
                        <textarea
                            id="descricao"
                            rows={5}
                            placeholder="Adicione informações sobre o equipamento..."
                        />
                    </div>

                    <div className="form-acoes">
                        <Link to="/epis" className="btn-cancelar">
                            Cancelar
                        </Link>

                        <button type="button" className="btn-salvar">
                            <i className="bi bi-check-lg"></i>
                            Cadastrar EPI
                        </button>
                    </div>

                </form>
            </div>
        </Layout>
    );
}

export default CadastroEpi;