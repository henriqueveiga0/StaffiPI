import { Navigate, Outlet } from "react-router-dom";

function RotaProtegida() {
    const usuario = localStorage.getItem("usuario");

    // Sem usuário guardado: volta para o login. Com usuário: mostra a página
    if (!usuario) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}

export default RotaProtegida;