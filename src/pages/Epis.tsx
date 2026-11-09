import { useState, useEffect, useRef, type ChangeEvent } from "react";
import Papa from "papaparse";
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

const statusValidos = ["Ativo", "Devolvido", "Danificado"];

// Aceita DD/MM/AAAA (como o Excel salva) e converte para AAAA-MM-DD
function converterData(texto: string) {
    const t = texto.trim();
    const br = t.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
    return br ? `${br[3]}-${br[2]}-${br[1]}` : t;
}

// Gera um arquivo de exemplo para a pessoa preencher
function baixarModelo() {
    const csv =
        "nome;categoria;quantidade;ca;validade;descricao;status\n" +
        "Capacete de segurança;Proteção da cabeça;20;12345;31/12/2027;Capacete classe B;Ativo\n";
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8" }); // \uFEFF: o Excel lê os acentos certo
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "modelo-epis.csv";
    a.click();
    URL.revokeObjectURL(url);
}


function Epis() {
    const [busca, setBusca] = useState("");
    const [epis, setEpis] = useState<Epi[]>([]);

async function carregarEpis() {
    try {
        const resposta = await fetch(API_URL);
        const dados = await resposta.json();
        setEpis(dados);
    } catch (erro) {
        console.error("Erro ao buscar EPIs:", erro);
    }
}

useEffect(() => {
    carregarEpis();
}, []);
    

    const episFiltrados = epis.filter((epi) =>
        epi.nome.toLowerCase().includes(busca.toLowerCase())
    );

const [mensagem, setMensagem] = useState<{ tipo: "ok" | "erro"; texto: string } | null>(null);
const [importando, setImportando] = useState(false);
const inputArquivo = useRef<HTMLInputElement>(null);

function escolherArquivo(e: ChangeEvent<HTMLInputElement>) {
    const arquivo = e.target.files?.[0];
    e.target.value = ""; // permite escolher o mesmo arquivo de novo depois
    if (!arquivo) return;
    setMensagem(null);

    Papa.parse<Record<string, string>>(arquivo, {
        header: true,           // a 1ª linha vira o nome das colunas
        skipEmptyLines: true,
        transformHeader: (h) => h.replace(/^\uFEFF/, "").trim().toLowerCase(),
        complete: (resultado) => enviarImportacao(resultado.data),
        error: () => setMensagem({ tipo: "erro", texto: "Não foi possível ler o arquivo." }),
    });
}

async function enviarImportacao(linhas: Record<string, string>[]) {
    const erros: string[] = [];
    const lista: {
        nome: string; categoria: string; quantidade: number;
        ca: string; validade: string; descricao: string; status: string;
    }[] = [];

    linhas.forEach((linha, i) => {
        const n = i + 2; // a linha 1 do arquivo é o cabeçalho
        const nome = (linha.nome ?? "").trim();
        const categoria = (linha.categoria ?? "").trim();
        const ca = (linha.ca ?? "").trim();
        const validade = converterData(linha.validade ?? "");
        const textoQtd = (linha.quantidade ?? "").trim();
        const quantidade = Number(textoQtd);
        const textoStatus = (linha.status ?? "").trim();
        const status = statusValidos.find((s) => s.toLowerCase() === textoStatus.toLowerCase());

        if (!nome) erros.push(`Linha ${n}: nome vazio`);
        if (!categoria) erros.push(`Linha ${n}: categoria vazia`);
        if (!ca) erros.push(`Linha ${n}: CA vazio`);
        if (!/^\d{4}-\d{2}-\d{2}$/.test(validade)) erros.push(`Linha ${n}: validade inválida (use DD/MM/AAAA)`);
        if (textoQtd === "" || !Number.isInteger(quantidade) || quantidade < 0) erros.push(`Linha ${n}: quantidade inválida`);
        if (textoStatus && !status) erros.push(`Linha ${n}: status deve ser Ativo, Devolvido ou Danificado`);

        lista.push({
            nome, categoria, quantidade, ca, validade,
            descricao: (linha.descricao ?? "").trim(),
            status: status ?? "Ativo", // status vazio vira Ativo
        });
    });

    if (lista.length === 0) {
        setMensagem({ tipo: "erro", texto: "O arquivo está vazio." });
        return;
    }
    if (erros.length > 0) {
        const extra = erros.length > 5 ? ` ... e mais ${erros.length - 5} erro(s)` : "";
        setMensagem({ tipo: "erro", texto: erros.slice(0, 5).join(" | ") + extra });
        return;
    }

    setImportando(true);
    try {
        const resposta = await fetch(`${API_URL}/importar`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(lista),
        });

        if (!resposta.ok) {
            const dados = await resposta.json();
            setMensagem({
                tipo: "erro",
                texto: Array.isArray(dados.message) ? dados.message.join(" | ") : dados.message,
            });
            return;
        }

        const salvos = await resposta.json();
        setMensagem({ tipo: "ok", texto: `${salvos.length} EPI(s) importado(s) com sucesso.` });
        carregarEpis(); // atualiza a tabela
    } catch {
        setMensagem({ tipo: "erro", texto: "Não foi possível conectar ao servidor." });
    } finally {
        setImportando(false);
    }
}


    return (
        <Layout>
            <div className="epis-header">
                <div>
                    <h1>Estoque de EPIs</h1>
                    <p>Gerencie os equipamentos de proteção da empresa</p>
                </div>
              <div className="epis-acoes">
    <button
        type="button"
        className="btn-importar"
        onClick={() => inputArquivo.current?.click()}
        disabled={importando}
    >
        <i className="bi bi-upload"></i>
        {importando ? "Importando..." : "Importar"}
    </button>

    <Link to="/epis/cadastrar" className="btn-novo-epi">
        <i className="bi bi-plus-lg"></i>
        Novo EPI
    </Link>

    <input ref={inputArquivo} type="file" accept=".csv" hidden onChange={escolherArquivo} />
</div>
            </div>
            
            <p className="epis-importar-ajuda">
    Importe um arquivo .csv com as colunas nome, categoria, quantidade, ca, validade, descricao e status.{" "}
    <button type="button" className="link-modelo" onClick={baixarModelo}>
        Baixar modelo
    </button>
</p>
{mensagem && (
    <p className={mensagem.tipo === "ok" ? "form-sucesso" : "form-erro"}>{mensagem.texto}</p>
)}



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
