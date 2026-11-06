import Layout from "../components/Layout";
import DashboardCard from "../components/DashboardCard";
import "./Home.css"
import Banner_dash from "../assets/Banner_dash.png";
import { useState, useEffect } from "react";

const usuario = JSON.parse(localStorage.getItem("usuario") ?? "{}")
const primeiroNome = usuario.nome?.split(" ")[0]

const API = "http://localhost:3000";

interface Epi {
    id: number;
    nome: string;
    quantidade: number;
}

interface Risco {
    id: number;
    nome: string;
    criticidade: string;
}

// O back-end guarda "medio", "critico"... e na tela mostramos com acento
const rotulos: Record<string, string> = {
    baixo: "Baixo",
    medio: "Médio",
    alto: "Alto",
    critico: "Crítico",
};

function Home(){
    
const [funcionarios, setFuncionarios] = useState<{ id: number }[]>([]);
const [epis, setEpis] = useState<Epi[]>([]);
const [riscos, setRiscos] = useState<Risco[]>([]);

useEffect(() => {
    async function carregarDados() {
        try {
            // Promise.all dispara as 3 buscas ao mesmo tempo e espera todas terminarem
            const [f, e, r] = await Promise.all([
                fetch(`${API}/funcionarios`).then((res) => res.json()),
                fetch(`${API}/epis`).then((res) => res.json()),
                fetch(`${API}/riscos`).then((res) => res.json()),
            ]);
            setFuncionarios(f);
            setEpis(e);
            setRiscos(r);
        } catch (erro) {
            console.error("Erro ao carregar o dashboard:", erro);
        }
    }
    carregarDados();
}, []);

// Totais dos cards
const totalFuncionarios = funcionarios.length;
const totalEpis = epis.reduce((soma, epi) => soma + epi.quantidade, 0); // soma das unidades
const totalRiscos = riscos.length;

// Estoque: os 5 EPIs com mais unidades
const episEstoque = [...epis].sort((a, b) => b.quantidade - a.quantidade).slice(0, 5);
const maiorQtd = Math.max(...episEstoque.map((epi) => epi.quantidade), 1);

// Riscos recentes: os 5 últimos cadastrados (maior id)
const riscosRecentes = [...riscos].sort((a, b) => b.id - a.id).slice(0, 5);

    return(
        <Layout>
            <div className="dashboard-banner">
                <img src={Banner_dash} alt="Bem-vindo ao Staffi" />
            </div>

            <h2 className="dashboard-titulo">Olá, {primeiroNome}! Visão Geral</h2>
            <div className="dashboard-cards">
                <DashboardCard titulo="Funcionários" valor={totalFuncionarios} icone="bi-people"/>

                <DashboardCard titulo="EPIs" valor={totalEpis} icone="bi-box-seam"/>

                <DashboardCard titulo="Riscos" valor={totalRiscos} icone="bi-exclamation-triangle"/>
            </div>

            <div className="dashboard-inferior">

                <div className="dashboard-estoque">
                    <h2>Estoque de EPIs</h2>
                    {episEstoque.length == 0 && <p>Nenhum Epi cadastrado</p>}
                    {episEstoque.map((epi) => (
                        <div className="epi-item" key={epi.id}>
                            <div className="epi-linha">
                                <span>{epi.nome}</span>
                                <strong>{epi.quantidade}</strong>
                            </div>
                            <div className="barra">
                                <div
                                    className="barra-preenchida"
                                    style={{ width: `${(epi.quantidade / maiorQtd) * 100}%` }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="dashboard-riscos">
                    <h2>Riscos recentes</h2>
                    {riscosRecentes.length == 0 && <p>Nenhum risco cadastrado</p>}
                    {riscosRecentes.map((risco) => (
                        <div className="risco-item" key={risco.id}>
                            <span>{risco.nome}</span>
                            <span className={`risco-etiqueta ${risco.criticidade}`}>
                                {rotulos[risco.criticidade] ?? risco.criticidade}</span>
                        </div>
                    ))}
                </div>

            </div>
        </Layout>
    )

}
export default Home;
