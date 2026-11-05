import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import "./CadastroRisco.css";

const API_URL = "http://localhost:3000/epis";

function CadastroEpi() {
    const navigate = useNavigate();

const [nome, setNome] = useState("");
const [categoria, setCategoria] = useState("");
const [quantidade, setQuantidade] = useState("");
const [ca, setCa] = useState("");
const [validade, setValidade] = useState("");
const [descricao, setDescricao] = useState("");
const [erro, setErro] = useState("");

async function salvar(e: FormEvent) {
    e.preventDefault();
    setErro("");

    try {
        const resposta = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                nome,
                categoria,
                quantidade: Number(quantidade),
                ca,
                validade,
                descricao,
            }),
        });

        if (!resposta.ok) {
            const dados = await resposta.json();
            setErro(Array.isArray(dados.message) ? dados.message.join(" | ") : dados.message);
            return;
        }

        navigate("/epis");
    } catch {
        setErro("Não foi possível conectar ao servidor.");
    }
}
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
                <form className="cadastro-risco-form" onSubmit={salvar}>

                    <div className="form-grupo">
                        <label htmlFor="nome">Nome do EPI</label>
                        <input
                            type="text"
                            id="nome"
                            placeholder="Ex: Capacete"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-linha">
                        <div className="form-grupo">
                            <label htmlFor="categoria">Categoria</label>
                            <input
                                type="text"
                                id="categoria"
                                placeholder="Ex: Proteção pra cabeça"
                                value={categoria}
                                onChange={(e) => setCategoria(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-grupo">
                            <label htmlFor="quantidade">Quantidade</label>
                            <input
                                type="number"
                                id="quantidade"
                                min="0"
                                placeholder="Ex: 30"
                                value={quantidade}
                                onChange={(e) => setQuantidade(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-linha">
                        <div className="form-grupo">
                            <label htmlFor="ca">Número do CA</label>
                        <input
                        type="number"
                        id="ca"
                        min="0"
                        placeholder="Ex: 30"
                        value={ca}
                        onChange={(e) => setCa(e.target.value)}
                        required
                    />
                        </div>

                        <div className="form-grupo">
                            <label htmlFor="validade">Validade</label>
                           <input
                            type="date"
                            id="validade"
                            placeholder="Ex: 2026-10-02"
                            value={validade}
                            onChange={(e) => setValidade(e.target.value)}
                            required
                        />
                        </div>
                    </div>

                    <div className="form-grupo">
                        <label htmlFor="descricao">Descrição</label>
                       <textarea
                            id="descricao"
                            rows={5}
                            placeholder="Adicione informações sobre o equipamento..."
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                        />
                    </div>

                    {erro && <p className="form-erro">{erro}</p>}
                    <div className="form-acoes">
                        <Link to="/epis" className="btn-cancelar">
                            Cancelar
                        </Link>

                        <button type="submit" className="btn-salvar">
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