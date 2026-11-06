import "./Sidebar.css"
import { Link, NavLink } from "react-router-dom"
import Logo from "../assets/Logo.png"
function Sidebar(){
    return(
        <aside className="sidebar">
            <div className="sidebar-logo">
                <img src={Logo} alt="logo" className="logo" />
                <h2>Staffi</h2>
            </div>
            <nav className="sidebar-nav">
                {/*NavLink - navega e sabe se aquela rota ta ativa. se tiver ativa 
                classname= "ativo", se nao classname= "" */
                }
                <NavLink to="/home" className={({isActive}) => isActive ? "ativo": ""}>
                    <i className="bi bi-house-door"></i>
                    <span>Home</span>
                </NavLink>

                <NavLink to="/riscos" className={({isActive}) => isActive ? "ativo": ""}>
                    <i className="bi bi-exclamation-triangle"></i>
                    <span>Riscos</span>
                </NavLink>

                <NavLink to="/epis" className={({isActive}) => isActive ? "ativo": ""}>
                    <i className="bi bi-box-seam"></i>
                    <span>EPIs</span>
                </NavLink>

                <NavLink to="/relatorio" className={({isActive}) => isActive ? "ativo": ""}>
                    <i className="bi bi-file-earmark-bar-graph"></i>
                    <span>Relatório</span>
                </NavLink>

                <NavLink to="/funcionario" className={({isActive}) => isActive ? "ativo": ""}>
                    <i className="bi bi-people"></i>
                    <span>Funcionário</span>
                </NavLink>

            </nav>
            <Link to="/" className="sidebar-sair" onClick={() => localStorage.removeItem("usuario")}
            >
            <i className="bi bi box-arrow-left"></i>
            <span>Sair</span>
            </Link>
        </aside>
    )
}
export default Sidebar;
