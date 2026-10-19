import { Link } from "react-router-dom";
import "./NaoEncontrada.css";

// Página mostrada quando o endereço digitado não existe (ex.: /abc)
function NaoEncontrada(){
    return(
        <main className="nao-encontrada">
            <div className="nao-encontrada-caixa">
                <i className="bi bi-compass"></i>
                <h1>Página não encontrada</h1>
                <p>O endereço que você tentou acessar não existe.</p>
                <Link to="/home" className="nao-encontrada-botao">
                    <i className="bi bi-house-door"></i>
                    Voltar para o início
                </Link>
            </div>
        </main>
    )
}
export default NaoEncontrada;
