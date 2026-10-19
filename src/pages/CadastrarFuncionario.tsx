import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import "./CadastroRisco.css";

function CadastroFuncionario() {
    return (
        <Layout>
            <div className="cadastro-risco-header">
                <div>
                    <Link to="/funcionarios" className="voltar">
                        <i className="bi bi-arrow-left"></i>
                        Voltar
                    </Link>

                    <h1>Cadastrar Funcionário</h1>
                    <p>Registre um novo funcionário no sistema</p>
                </div>
            </div>

            <div className="cadastro-risco-card">
                <form className="cadastro-risco-form">

                    <div className="form-grupo">
                        <label htmlFor="nome">Nome completo</label>
                        <input
                            type="text"
                            id="nome"
                            placeholder="Ex: João da Silva"
                        />
                    </div>

                    <div className="form-linha">
                        <div className="form-grupo">
                            <label htmlFor="cargo">Cargo</label>
                            <input
                                type="text"
                                id="cargo"
                                placeholder="Ex: Operador de máquinas"
                            />
                        </div>

                        <div className="form-grupo">
                            <label htmlFor="setor">Setor</label>
                            <input
                                type="text"
                                id="setor"
                                placeholder="Ex: Produção"
                            />
                        </div>
                    </div>

                    <div className="form-linha">
                        <div className="form-grupo">
                            <label htmlFor="email">E-mail</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="funcionario@empresa.com"
                            />
                        </div>

                        <div className="form-grupo">
                            <label htmlFor="telefone">Telefone</label>
                            <input
                                type="tel"
                                id="telefone"
                                placeholder="(11) 99999-9999"
                            />
                        </div>
                    </div>

                    <div className="form-grupo">
                        <label htmlFor="status">Status</label>

                        <select id="status">
                            <option value="">Selecione</option>
                            <option value="ativo">Ativo</option>
                            <option value="inativo">Inativo</option>
                        </select>
                    </div>

                    <div className="form-acoes">
                        <Link
                            to="/funcionario"
                            className="btn-cancelar"
                        >
                            Cancelar
                        </Link>

                        <button
                            type="button"
                            className="btn-salvar"
                        >
                            <i className="bi bi-check-lg"></i>
                            Cadastrar funcionário
                        </button>
                    </div>

                </form>
            </div>
        </Layout>
    );
}

export default CadastroFuncionario;