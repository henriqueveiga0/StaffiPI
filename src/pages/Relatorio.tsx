import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import "./Relatorio.css";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const API = "http://localhost:3000";

interface Risco {
    id: number;
    nome: string;
    local: string;
    criticidade: string;
}

interface Epi {
    id: number;
    nome: string;
    categoria: string;
    quantidade: number;
    ca: string;
    validade: string;
    status: string;
}

interface FuncionarioDados {
    id: number;
    nome: string;
    cargo: string;
    setor: string;
    status: string;
}

type TipoRelatorio = "riscos" | "epis" | "funcionarios";

// O que a tela precisa para desenhar qualquer relatório
interface RelatorioMontado {
    resumo: { rotulo: string; valor: number }[];
    colunas: string[];
    linhas: (string | number)[][];
}

const rotulosCriticidade: Record<string, string> = {
    baixo: "Baixo",
    medio: "Médio",
    alto: "Alto",
    critico: "Crítico",
};

// Lista dos relatórios disponíveis. Para criar outro, é só adicionar um item aqui.
const relatorios: { id: TipoRelatorio; icone: string; titulo: string; descricao: string }[] = [
    {
        id: "riscos",
        icone: "bi-exclamation-triangle",
        titulo: "Relatório de Riscos",
        descricao: "Acompanhe os riscos ocupacionais identificados na empresa",
    },
    {
        id: "epis",
        icone: "bi-box-seam",
        titulo: "Relatório de EPIs",
        descricao: "Consulte informações sobre estoque e equipamentos de proteção",
    },
    {
        id: "funcionarios",
        icone: "bi-people",
        titulo: "Funcionários",
        descricao: "Visualize informações relacionadas aos funcionários",
    },
];

// Devolve a classe da etiqueta para as colunas que têm uma (ou null para texto comum)
function classeEtiqueta(coluna: string, valor: string | number) {
    if (coluna !== "Criticidade" && coluna !== "Status") return null;

    const sufixo = String(valor)
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") // tira os acentos: "Médio" vira "Medio"
        .toLowerCase();

    return `badge badge-${sufixo}`;
}


function Relatorio(){
    const [riscos, setRiscos] = useState<Risco[]>([]);
    const [epis, setEpis] = useState<Epi[]>([]);
    const [funcionarios, setFuncionarios] = useState<FuncionarioDados[]>([]);
    const [aberto, setAberto] = useState<TipoRelatorio | null>(null);

    useEffect(() => {
        async function carregarDados() {
            try {
                const [r, e, f] = await Promise.all([
                    fetch(`${API}/riscos`).then((res) => res.json()),
                    fetch(`${API}/epis`).then((res) => res.json()),
                    fetch(`${API}/funcionarios`).then((res) => res.json()),
                ]);
                setRiscos(r);
                setEpis(e);
                setFuncionarios(f);
            } catch (erro) {
                console.error("Erro ao carregar os relatórios:", erro);
            }
        }
        carregarDados();
    }, []);

    // Monta os totais e a tabela do relatório que está aberto
    function montarRelatorio(): RelatorioMontado | null {
        if (aberto === "riscos") {
            return {
                resumo: [
                    { rotulo: "Total de riscos", valor: riscos.length },
                    { rotulo: "Críticos", valor: riscos.filter((r) => r.criticidade === "critico").length },
                    { rotulo: "Altos", valor: riscos.filter((r) => r.criticidade === "alto").length },
                    { rotulo: "Médios", valor: riscos.filter((r) => r.criticidade === "medio").length },
                    { rotulo: "Baixos", valor: riscos.filter((r) => r.criticidade === "baixo").length },
                ],
                colunas: ["Risco", "Local", "Criticidade"],
                linhas: riscos.map((r) => [
                    r.nome,
                    r.local,
                    rotulosCriticidade[r.criticidade] ?? r.criticidade,
                ]),
            };
        }

        if (aberto === "epis") {
            return {
                resumo: [
                    { rotulo: "Tipos de EPI", valor: epis.length },
                    { rotulo: "Unidades em estoque", valor: epis.reduce((soma, e) => soma + e.quantidade, 0) },
                    { rotulo: "Ativos", valor: epis.filter((e) => e.status === "Ativo").length },
                    { rotulo: "Devolvidos", valor: epis.filter((e) => e.status === "Devolvido").length },
                    { rotulo: "Danificados", valor: epis.filter((e) => e.status === "Danificado").length },
                ],
                colunas: ["EPI", "Categoria", "Quantidade", "CA", "Validade", "Status"],
                linhas: epis.map((e) => [
                    e.nome,
                    e.categoria,
                    e.quantidade,
                    e.ca,
                    e.validade.split("-").reverse().join("/"), // AAAA-MM-DD vira DD/MM/AAAA
                    e.status,
                ]),
            };
        }

        if (aberto === "funcionarios") {
            return {
                resumo: [
                    { rotulo: "Total de funcionários", valor: funcionarios.length },
                    { rotulo: "Ativos", valor: funcionarios.filter((f) => f.status === "ativo").length },
                    { rotulo: "Inativos", valor: funcionarios.filter((f) => f.status === "inativo").length },
                    { rotulo: "Setores", valor: new Set(funcionarios.map((f) => f.setor)).size },
                ],
                colunas: ["Nome", "Cargo", "Setor", "Status"],
                linhas: funcionarios.map((f) => [
                    f.nome,
                    f.cargo,
                    f.setor,
                    f.status === "ativo" ? "Ativo" : "Inativo",
                ]),
            };
        }

        return null;
    }

    const relatorioAtual = montarRelatorio();
    const tituloAtual = relatorios.find((r) => r.id === aberto)?.titulo;

    function baixarPdf() {
    if (!relatorioAtual || !tituloAtual) return;

    const doc = new jsPDF();
    const largura = doc.internal.pageSize.getWidth();
    const altura = doc.internal.pageSize.getHeight();

    // Cabeçalho
    doc.setFontSize(18);
    doc.text("Staffi", 14, 18);
    doc.setFontSize(14);
    doc.text(tituloAtual, 14, 28);
    doc.setFontSize(10);
    doc.setTextColor(120);
    doc.text(`Gerado em ${new Date().toLocaleString("pt-BR")}`, 14, 35);
    doc.setTextColor(0);

    // Tabela de resumo (os totais)
    autoTable(doc, {
        startY: 42,
        head: [["Resumo", "Total"]],
        body: relatorioAtual.resumo.map((item) => [item.rotulo, item.valor]),
        theme: "grid",
        headStyles: { fillColor: [0, 134, 255] },
        tableWidth: 90,
    });

    // O autoTable guarda onde a tabela terminou, para começarmos a próxima abaixo
    const fimResumo = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY;

    // Tabela com todos os registros
    autoTable(doc, {
        startY: fimResumo + 10,
        head: [relatorioAtual.colunas],
        body: relatorioAtual.linhas,
        theme: "striped",
        headStyles: { fillColor: [0, 134, 255] },
        styles: { fontSize: 9 },
    });

    // Numeração das páginas (só dá para saber o total depois de desenhar tudo)
    const totalPaginas = doc.getNumberOfPages();
    for (let i = 1; i <= totalPaginas; i++) {
        doc.setPage(i);
        doc.setFontSize(9);
        doc.setTextColor(120);
        doc.text(`Página ${i} de ${totalPaginas}`, largura - 14, altura - 8, { align: "right" });
    }

    const data = new Date().toLocaleDateString("en-CA"); // AAAA-MM-DD
    doc.save(`relatorio-${aberto}-${data}.pdf`);
}

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
                        <button type="button" onClick={() => setAberto(relatorio.id)}>
                            Visualizar
                            <i className="bi bi-arrow-right"></i>
                        </button>
                    </div>
                ))}
            </div>

            {relatorioAtual && (
                <section className="relatorio-detalhe">
                   <div className="relatorio-detalhe-acoes">
    <button type="button" className="relatorio-baixar" onClick={baixarPdf}>
        <i className="bi bi-file-earmark-pdf"></i>
        Baixar PDF
    </button>
    <button
        type="button"
        className="relatorio-fechar"
        onClick={() => setAberto(null)}
    >
        <i className="bi bi-x-lg"></i>
        Fechar
    </button>
</div>

                    <div className="relatorio-resumo">
                        {relatorioAtual.resumo.map((item) => (
                            <div className="resumo-item" key={item.rotulo}>
                                <span>{item.rotulo}</span>
                                <strong>{item.valor}</strong>
                            </div>
                        ))}
                    </div>

                    <div className="relatorio-tabela">
                        <table>
                            <thead>
                                <tr>
                                    {relatorioAtual.colunas.map((coluna) => (
                                        <th key={coluna}>{coluna}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {relatorioAtual.linhas.length === 0 && (
                                    <tr>
                                        <td colSpan={relatorioAtual.colunas.length}>
                                            Nenhum registro encontrado.
                                        </td>
                                    </tr>
                                )}
                                {relatorioAtual.linhas.map((linha, i) => (
                                    <tr key={i}>
                                       {linha.map((celula, j) => {
    const classe = classeEtiqueta(relatorioAtual.colunas[j], celula);
    return (
        <td key={j}>
            {classe ? <span className={classe}>{celula}</span> : celula}
        </td>
    );
})}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            )}
        </Layout>
    )
}
export default Relatorio;