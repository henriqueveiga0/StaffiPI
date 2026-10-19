import Layout from "../components/Layout";
import DashboardCard from "../components/DashboardCard";
import "./Home.css"
import Banner_dash from "../assets/Banner_dash.png";

function Home(){
    // TODO (back-end): trocar estes dados de exemplo por chamadas à API (useEffect + fetch)
    const totalFuncionarios = 24;
    const totalEpis = 67;
    const totalRiscos = 3;

    const epis = [
        {id:1, nome: "Capacete", qtd: 15},
        {id:2, nome: "Luvas", qtd: 32},
        {id:3, nome: "Óculos", qtd: 20}
    ];

    const riscos = [
        {id:1, nome: "Ruído excessivo", nivel: "Médio", classe: "medio"},
        {id:2, nome: "Queda de altura", nivel: "Alto", classe: "alto"},
        {id:3, nome: "Risco elétrico", nivel: "Crítico", classe: "critico"}
    ];

    // maior quantidade em estoque: serve de referência para o tamanho das barras
    const maiorQtd = Math.max(...epis.map((epi) => epi.qtd), 1);

    return(
        <Layout>
            <div className="dashboard-banner">
                <img src={Banner_dash} alt="Bem-vindo ao Staffi" />
            </div>

            <h2 className="dashboard-titulo">Visão Geral</h2>
            <div className="dashboard-cards">
                <DashboardCard titulo="Funcionários" valor={totalFuncionarios} icone="bi-people"/>

                <DashboardCard titulo="EPIs" valor={totalEpis} icone="bi-box-seam"/>

                <DashboardCard titulo="Riscos" valor={totalRiscos} icone="bi-exclamation-triangle"/>
            </div>

            <div className="dashboard-inferior">

                <div className="dashboard-estoque">
                    <h2>Estoque de EPIs</h2>
                    {epis.map((epi) => (
                        <div className="epi-item" key={epi.id}>
                            <div className="epi-linha">
                                <span>{epi.nome}</span>
                                <strong>{epi.qtd}</strong>
                            </div>
                            <div className="barra">
                                <div
                                    className="barra-preenchida"
                                    style={{ width: `${(epi.qtd / maiorQtd) * 100}%` }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="dashboard-riscos">
                    <h2>Riscos recentes</h2>
                    {riscos.map((risco) => (
                        <div className="risco-item" key={risco.id}>
                            <span>{risco.nome}</span>
                            <span className={`risco-etiqueta ${risco.classe}`}>{risco.nivel}</span>
                        </div>
                    ))}
                </div>

            </div>
        </Layout>
    )

}
export default Home;
