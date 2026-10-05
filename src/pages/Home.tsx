import Layout from "../Components/Layout";
import DashboardCard from "../Components/DashboardCard";
import "./Home.css"
function Home(){
    const totalFunc = 32;
    const totalEpis = 67;
    const totalRiscos = 3;
    const epis = [
        {id:1, nome: "Capacete ", qtd: 15},
        {id:2, nome: "Luvas ", qtd: 15},
        {id:3, nome: "Óculos ", qtd: 15}
    ];
    return(
        <Layout>
            <div className="dashboard-cards">
            <h1>Dashboard</h1>
            <DashboardCard titulo="Funcionários" valor={totalFunc}/>

            <DashboardCard titulo="EPIs" valor={totalEpis}/>

            <DashboardCard titulo="Riscos" valor={totalRiscos}/>
            </div>

            <div className="dashboard-estoque">
                <h2>Estoque de EPIs</h2>
                {epis.map((epi) => (
                    <div className="epi-item" key={epi.id}>
                        <span>{epi.nome}</span>
                        <span>{epi.qtd}</span>
                    </div>
                ))}
            </div>

        </Layout>
    )

}
export default Home;