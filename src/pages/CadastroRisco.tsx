import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import "./CadastroRisco.css";

const API_URL = "http://localhost:3000/riscos";
function CadastroRisco(){
const navigate = useNavigate();

const [nome, setNome] = useState("");
const [local, setLocal] = useState("");
const [criticidade, setCriticidade] = useState("");
const [descricao, setDescricao] = useState("");
const [erro, setErro] = useState("");

async function salvar(e: FormEvent) {
    e.preventDefault(); // impede a página de recarregar ao enviar o form
    setErro("");

    try {
        const resposta = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome, local, criticidade, descricao }),
        });

        if (!resposta.ok) {
            // o back-end devolve as mensagens de validação em "message"
            const dados = await resposta.json();
            setErro(Array.isArray(dados.message) ? dados.message.join(" | ") : dados.message);
            return;
        }

        navigate("/riscos");
    } catch {
        setErro("Não foi possível conectar ao servidor.");
    }
}

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
                <form className="cadastro-risco-form" onSubmit={salvar}>
                    <div className="form-grupo">
                        <label htmlFor="nome">Nome do risco</label>
                       {/* Nome do risco */}
                        <input
                            type="text"
                            id="nome"
                            placeholder="Ex: Ruído excessivo"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-linha">
                        <div className="form-grupo">
                            <label htmlFor="local">Local / Setor</label>

                           {/* Local / Setor */}
                                <input
                                    type="text"
                                    id="local"
                                    placeholder="Ex: Produção"
                                    value={local}
                                    onChange={(e) => setLocal(e.target.value)}
                                    required
                                />
                        </div>

                        <div className="form-grupo">
                            <label htmlFor="criticidade">Criticidade</label>

                            <select id="criticidade"
                            value={criticidade}
                            onChange={(e) => setCriticidade(e.target.value)}
                            required>
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
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                        />
                    </div>
                    {erro && <p className="form-erro">{erro}</p>}
                    <div className="form-acoes">
                        <Link to="/riscos" className="btn-cancelar">
                            Cancelar
                        </Link>

                        <button type="submit" className="btn-salvar">
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