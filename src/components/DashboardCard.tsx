import { useEffect, useState } from "react";

//Aqui dizemos que todo DashboardCard precisa receber um titulo do tipo string e um valor number
interface DashboardCardProps {
    titulo: string;
    valor: number;
    icone: string;
}
//Aqui o componente recebe essas informações, isso sao as props
function DashboardCard({titulo, valor, icone}: DashboardCardProps){
    // contador animado: o número sobe de 0 até o valor em 0,9 segundo
    const [contador, setContador] = useState(0);

    useEffect(() => {
        let inicio: number | null = null;
        let frame = 0;

        function passo(agora: number){
            if (inicio === null) inicio = agora;
            const progresso = Math.min((agora - inicio) / 900, 1);
            const suave = 1 - Math.pow(1 - progresso, 3); // começa rápido e desacelera
            setContador(Math.round(valor * suave));
            if (progresso < 1) frame = requestAnimationFrame(passo);
        }

        frame = requestAnimationFrame(passo);
        return () => cancelAnimationFrame(frame);
    }, [valor]);

    return(
        <div className="dashboard-card">
            <div className="card-icone">
                <i className={`bi ${icone}`}></i>
            </div>
            <p>{titulo}</p>
            <h2>{contador}</h2>
        </div>
    )
}
export default DashboardCard;
