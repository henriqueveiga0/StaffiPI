import { useState } from "react";
import Layout from "../components/Layout";
import "./Riscos.css";
import { Link } from "react-router-dom";

const riscos = [
    { id: 1, nome: "Ruído excessivo", local: "Produção", criticidade: "Médio" },
    { id: 2, nome: "Queda de altura", local: "Produção", criticidade: "Alto" },
    { id: 3, nome: "Risco elétrico", local: "Manutenção", criticidade: "Crítico" },
];

function classeDaCriticidade(criticidade: string) {
    if (criticidade === "Crítico") return "badge-critico";
    if (criticidade === "Alto") return "badge-alto";
    return "badge-medio";
}

function Riscos() {
    const [busca, setBusca] = useState("");

    const riscosFiltrados = riscos.filter((risco) =>
        `${risco.nome} ${risco.local}`.toLowerCase().includes(busca.toLowerCase())
    );

    return (
        <Layout>
            <div className="riscos-header">
                <div>
                    <h1>Riscos</h1>
                    <p>Gerencie os riscos identificados no ambiente de trabalho</p>
                </div>
                <Link to="/riscos/cadastrar" className="btn-novo-risco">
                    <i className="bi bi-plus-lg"></i>
                    Cadastrar risco
                </Link>
            </div>

            <div className="riscos-filtros">
                <div className="riscos-pesquisa">
                    <i className="bi bi-search"></i>
                    <input
                        type="text"
                        placeholder="Pesquisar risco..."
                        value={busca}
                        onChange={(e) => setBusca(e.target.value)}
                    />
                </div>
            </div>

            <div className="riscos-tabela">
                <table>
                    <thead>
                        <tr>
                            <th>Risco</th>
                            <th>Local</th>
                            <th>Criticidade</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {riscosFiltrados.map((risco) => (
                            <tr key={risco.id}>
                                <td>{risco.nome}</td>
                                <td>{risco.local}</td>
                                <td>
                                    <span className={`badge ${classeDaCriticidade(risco.criticidade)}`}>
                                        {risco.criticidade}
                                    </span>
                                </td>
                                <td>
                                    <button className="btn-acao" aria-label="Ações">
                                        <i className="bi bi-three-dots"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {riscosFiltrados.length === 0 && (
                            <tr>
                                <td colSpan={4} className="riscos-vazio">Nenhum risco encontrado.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </Layout>
    );
}

export default Riscos;
