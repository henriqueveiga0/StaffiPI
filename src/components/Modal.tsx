import { useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";
import "./Modal.css";

// Janelinha (modal) reutilizável: usada nos botões "Novo EPI", "Cadastrar risco" etc.
interface ModalProps {
    titulo: string;
    aberto: boolean;
    onFechar: () => void;
    children: ReactNode;
}

function Modal({titulo, aberto, onFechar, children}: ModalProps){
    // fecha ao apertar a tecla Esc
    useEffect(() => {
        if (!aberto) return;
        function aoApertar(e: KeyboardEvent){
            if (e.key === "Escape") onFechar();
        }
        window.addEventListener("keydown", aoApertar);
        return () => window.removeEventListener("keydown", aoApertar);
    }, [aberto, onFechar]);

    if (!aberto) return null;

    // createPortal desenha o modal direto no <body>, por cima de tudo
    return createPortal(
        <div className="modal-fundo" onClick={onFechar}>
            {/* stopPropagation: clicar dentro da janela não fecha */}
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-topo">
                    <h2>{titulo}</h2>
                    <button className="modal-fechar" onClick={onFechar} aria-label="Fechar">
                        <i className="bi bi-x-lg"></i>
                    </button>
                </div>
                {children}
            </div>
        </div>,
        document.body
    );
}
export default Modal;
