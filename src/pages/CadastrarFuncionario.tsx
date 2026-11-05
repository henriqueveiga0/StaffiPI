import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import "./CadastroRisco.css";

const API_URL = "http://localhost:3000/funcionarios";
function CadastroFuncionario() {
    const navigate = useNavigate();

const [nome, setNome] = useState("");
const [cargo, setCargo] = useState("");
const [setor, setSetor] = useState("");
const [email, setEmail] = useState("");
const [telefone, setTelefone] = useState("");
const [status, setStatus] = useState("ativo");
const [erro, setErro] = useState("");

async function salvar(e: FormEvent) {
    e.preventDefault();
    setErro("");

    try {
        const resposta = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome, cargo, setor, email, telefone, status }),
        });

        if (!resposta.ok) {
            const dados = await resposta.json();
            setErro(Array.isArray(dados.message) ? dados.message.join(" | ") : dados.message);
            return;
        }

        navigate("/funcionario");
    } catch {
        setErro("Não foi possível conectar ao servidor.");
    }
}
    return (
        <Layout>
            <div className="cadastro-risco-header">
                <div>
                    <Link to="/funcionario" className="voltar">
                        <i className="bi bi-arrow-left"></i>
                        Voltar
                    </Link>

                    <h1>Cadastrar Funcionário</h1>
                    <p>Registre um novo funcionário no sistema</p>
                </div>
            </div>

            <div className="cadastro-risco-card">
                <form className="cadastro-risco-form" onSubmit={salvar}>

    <div className="form-grupo">
        <label htmlFor="nome">Nome completo</label>
        <input
            type="text"
            id="nome"
            placeholder="Ex: João da Silva"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
        />
    </div>

    <div className="form-linha">
        <div className="form-grupo">
            <label htmlFor="cargo">Cargo</label>
            <input
                type="text"
                id="cargo"
                placeholder="Ex: Operador de máquinas"
                value={cargo}
                onChange={(e) => setCargo(e.target.value)}
                required
            />
        </div>

        <div className="form-grupo">
            <label htmlFor="setor">Setor</label>
            <input
                type="text"
                id="setor"
                placeholder="Ex: Produção"
                value={setor}
                onChange={(e) => setSetor(e.target.value)}
                required
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
        </div>

        <div className="form-grupo">
            <label htmlFor="telefone">Telefone</label>
            <input
                type="tel"
                id="telefone"
                placeholder="(11) 99999-9999"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
            />
        </div>
    </div>

    <div className="form-grupo">
        <label htmlFor="status">Status</label>
        <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
        >
            <option value="ativo">Ativo</option>
            <option value="inativo">Inativo</option>
        </select>
    </div>

    {erro && <p className="form-erro">{erro}</p>}

    <div className="form-acoes">
        <Link to="/funcionario" className="btn-cancelar">
            Cancelar
        </Link>

        <button type="submit" className="btn-salvar">
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