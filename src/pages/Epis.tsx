import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import "./Epis.css";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:3000/epis";

interface Epi {
    id: number;
    nome: string;
    categoria: string;
    quantidade: number;
    ca: string;
    validade: string;
    descricao: string | null;
    status: string;
}

function Epis() {
    const [busca, setBusca] = useState("");
    const [epis, setEpis] = useState<Epi[]>([]);

useEffect(() => {
    async function carregarEpis() {
        try {
            const resposta = await fetch(API_URL);
            const dados = await resposta.json();
            setEpis(dados);
        } catch (erro) {
            console.error("Erro ao buscar EPIs:", erro);
        }
    }
    carregarEpis();
}, []);
    

    const episFiltrados = epis.filter((epi) =>
        epi.nome.toLowerCase().includes(busca.toLowerCase())
    );

    return (
        <Layout>
            <div className="epis-header">
                <div>
                    <h1>Estoque de EPIs</h1>
                    <p>Gerencie os equipamentos de proteção da empresa</p>
                </div>
               <Link to="/epis/cadastrar" className="btn-novo-epi">
                    <i className="bi bi-plus-lg"></i>
                    Novo EPI
                </Link>
            </div>

            <div className="epis-filtros">
                <div className="epis-pesquisa">
                    <i className="bi bi-search"></i>
                    <input
                        type="text"
                        placeholder="Pesquisar EPI"
                        value={busca}
                        onChange={(e) => setBusca(e.target.value)}
                    />
                </div>
            </div>

            <div className="epis-tabela">
                <table>
                    <thead>
                        <tr>
                            <th>EPI</th>
                            <th>Quantidade</th>
                            <th>Disponibilidade</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {episFiltrados.map((epi) => (
                            <tr key={epi.id}>
                                <td>{epi.nome}</td>
                                <td>{epi.quantidade}</td>
                                <td>
                                    <span className={`badge badge-${epi.status.toLowerCase()}`}>
                                        {epi.status}
                                    </span>
                                </td>
                                <td>
                                    <button className="btn-acao" aria-label="Ações">
                                        <i className="bi bi-three-dots"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {episFiltrados.length === 0 && (
                            <tr>
                                <td colSpan={4} className="epis-vazio">Nenhum EPI encontrado.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </Layout>
    );
}

export default Epis;
