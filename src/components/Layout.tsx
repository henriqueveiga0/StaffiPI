import Sidebar from "./Sidebar";
import "./Layout.css"
import type { ReactNode } from "react";

{/* Componente Layout recebe uma propriedade chamada children, que pode ser conteudo react
    React Node permite que o react renderize tags como h1 */}
interface LayoutProps{
    children: ReactNode;
}

{/* A função vai receber esse conteudo. {children} é o lugar onde queremos q ele apareça  */}
function Layout({children}: LayoutProps){
    return(
        <main className="pagina">
            <Sidebar/>
            <div className="conteudo">
                {children}
            </div>
        </main>
    )
}
export default Layout;