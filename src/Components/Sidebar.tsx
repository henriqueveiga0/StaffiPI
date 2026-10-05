import "./Sidebar.css"
import { NavLink } from "react-router-dom"
function Sidebar(){
    return(
        <aside className="sidebar">
            <h2>Staffi</h2>
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

                <NavLink to="/relatorio" className={({isActive}) => isActive ? "ativo ": ""}>
                    <i className="bi bi-file-earmark-bar-graph"></i>
                    <span>Relatório</span>
                </NavLink>

                <NavLink to="/funcionario" className={({isActive}) => isActive ? "ativo": ""}>
                    <i className="bi bi-people"></i>
                    <span>Funcionário</span>
                </NavLink>

            </nav>
        </aside>
    )
}
export default Sidebar;