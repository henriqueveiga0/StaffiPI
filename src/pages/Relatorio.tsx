import Layout from "../components/Layout";
import "./Relatorio.css";

// Lista dos relatórios disponíveis. Para criar outro, é só adicionar um item aqui.
const relatorios = [
    {
        id: 1,
        icone: "bi-exclamation-triangle",
        titulo: "Relatório de Riscos",
        descricao: "Acompanhe os riscos ocupacionais identificados na empresa",
    },
    {
        id: 2,
        icone: "bi-box-seam",
        titulo: "Relatório de EPIs",
        descricao: "Consulte informações sobre estoque e equipamentos de proteção",
    },
    {
        id: 3,
        icone: "bi-people",
        titulo: "Funcionários",
        descricao: "Visualize informações relacionadas aos funcionários",
    },
];

function Relatorio(){
    return(
        <Layout>
            <div className="relatorio-header">
                <h1>Relatórios</h1>
                <p>Acompanhe e visualize os principais dados da empresa</p>
            </div>

            <div className="relatorio-grid">
                {relatorios.map((relatorio) => (
                    <div className="relatorio-card" key={relatorio.id}>
                        <div className="relatorio-icone">
                            <i className={`bi ${relatorio.icone}`}></i>
                        </div>
                        <h2>{relatorio.titulo}</h2>
                        <p>{relatorio.descricao}</p>
                        <button>
                            Visualizar
                            <i className="bi bi-arrow-right"></i>
                        </button>
                    </div>
                ))}
            </div>
        </Layout>
    )
}
export default Relatorio;
