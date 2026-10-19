import { useState } from "react";
import Layout from "../components/Layout";
import "./Funcionarios.css";

const funcionarios = [
    { id: 1, nome: "João Silva", email: "joao@staffi.com", cargo: "Operador", setor: "Produção", status: "Ativo" },
    { id: 2, nome: "Maria Oliveira", email: "maria@staffi.com", cargo: "Técnica de Segurança", setor: "Segurança do Trabalho", status: "Ativo" },
    { id: 3, nome: "Carlos Santos", email: "carlos@staffi.com", cargo: "Eletricista", setor: "Manutenção", status: "Inativo" },
];

function pegarIniciais(nome: string) {
    return nome
        .split(" ")
        .filter((parte) => parte !== "")
        .slice(0, 2)
        .map((parte) => parte[0])
        .join("")
        .toUpperCase();
}

function Funcionarios() {
    const [busca, setBusca] = useState("");

    const funcionariosFiltrados = funcionarios.filter((f) =>
        `${f.nome} ${f.email} ${f.cargo} ${f.setor}`.toLowerCase().includes(busca.toLowerCase())
    );

    return (
        <Layout>
            <div className="funcionarios-header">
                <div>
                    <h1>Funcionários</h1>
                    <p>Gerencie os funcionários cadastrados na empresa</p>
                </div>

                <button className="btn-novo-funcionario">
                    <i className="bi bi-plus-lg"></i>
                    Novo funcionário
                </button>
            </div>

            <div className="funcionarios-filtros">
                <div className="funcionarios-pesquisa">
                    <i className="bi bi-search"></i>
                    <input
                        type="text"
                        placeholder="Pesquisar funcionário..."
                        value={busca}
                        onChange={(e) => setBusca(e.target.value)}
                    />
                </div>
            </div>

            <div className="funcionarios-tabela">
                <table>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Cargo</th>
                            <th>Setor</th>
                            <th>Status</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {funcionariosFiltrados.map((f) => (
                            <tr key={f.id}>
                                <td>
                                    <div className="funcionario-nome">
                                        <div className="funcionario-avatar">{pegarIniciais(f.nome)}</div>
                                        <div>
                                            <strong>{f.nome}</strong>
                                            <span>{f.email}</span>
                                        </div>
                                    </div>
                                </td>
                                <td>{f.cargo}</td>
                                <td>{f.setor}</td>
                                <td>
                                    <span className={`badge badge-${f.status.toLowerCase()}`}>
                                        {f.status}
                                    </span>
                                </td>
                                <td>
                                    <button className="btn-acao" aria-label="Ações">
                                        <i className="bi bi-three-dots"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {funcionariosFiltrados.length === 0 && (
                            <tr>
                                <td colSpan={5} className="funcionarios-vazio">Nenhum funcionário encontrado.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </Layout>
    );
}

export default Funcionarios;
