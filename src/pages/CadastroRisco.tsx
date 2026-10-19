import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import "./CadastroRisco.css";

function CadastroRisco(){
    return(
        <Layout>
            <div className="cadastro-risco-header">
                <div>
                    <Link to="/riscos" className="voltar">
                        <i className="bi bi-arrow-left"></i>
                        Voltar
                    </Link>
                    <h1>Cadastrar Risco</h1>
                    <p>Registre um novo risco ocupacional</p>
                </div>
            </div>

            <div className="cadastro-risco-card">
                <form className="cadastro-risco-form">
                    <div className="form-grupo">
                        <label htmlFor="nome">Nome do risco</label>
                        <input type="text" id="local" placeholder="Ex: Produção" />
                    </div>

                    <div className="form-linha">
                        <div className="form-grupo">
                            <label htmlFor="local">Local / Setor</label>

                            <input
                                type="text"
                                id="local"
                                placeholder="Ex: Produção"
                            />
                        </div>

                        <div className="form-grupo">
                            <label htmlFor="criticidade">Criticidade</label>

                            <select id="criticidade">
                                <option value="">Selecione</option>
                                <option value="baixo">Baixo</option>
                                <option value="medio">Médio</option>
                                <option value="alto">Alto</option>
                                <option value="critico">Crítico</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-grupo">
                        <label htmlFor="descricao">Descrição</label>

                        <textarea
                            id="descricao"
                            placeholder="Descreva o risco identificado..."
                            rows={5}
                        />
                    </div>

                    <div className="form-acoes">
                        <Link to="/riscos" className="btn-cancelar">
                            Cancelar
                        </Link>

                        <button type="button" className="btn-salvar">
                            <i className="bi bi-check-lg"></i>
                            Cadastrar risco
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    )
}
export default CadastroRisco;