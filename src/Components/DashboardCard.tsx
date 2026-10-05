
//Aqui dizemos que todo DashboardCard precisa receber um titulo do tipo string e um valor number
interface DashboardCardProps {
    titulo: string;
    valor: number;
}
//Aqui o componente recebe essas informações, isso sao as props
function DashboardCard({titulo, valor}: DashboardCardProps){
    return(
        <div className="dashboard-card">
            <p>{titulo}</p>
            <h2>{valor}</h2>
        </div>
    )
}
export default DashboardCard;