import { useState } from "react";
import { Link } from "react-router-dom";
import "./Cadastro.css";
import Banner from "../assets/Banner.png";

function Cadastro() {
    const [mostrarSenha, setMostrarSenha] = useState(false);

    return (
        <main className="cadastro">
            <div className="cadastro-left">
                <div className="cadastro-container">
                    <h1>Crie sua conta</h1>
                    <p>Preencha seus dados para começar</p>

                    <form className="cadastro-form">
                        <div className="campo">
                            <label htmlFor="nome">Nome Completo</label>
                            <input type="text" name="nome" id="nome" placeholder="Digite seu nome completo" autoComplete="name" />
                        </div>

                        <div className="campo">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" id="email" placeholder="Digite seu email" autoComplete="email" />
                        </div>

                        <div className="campo">
                            <label htmlFor="senha">Senha</label>
                            <div className="campo-senha">
                                <input
                                    type={mostrarSenha ? "text" : "password"}
                                    id="senha"
                                    name="senha"
                                    placeholder="Digite sua senha"
                                    autoComplete="new-password"
                                />
                                <button
                                    type="button"
                                    className="btn-olho"
                                    aria-label="Mostrar ou esconder senha"
                                    onClick={() => setMostrarSenha(!mostrarSenha)}
                                >
                                    <i className={mostrarSenha ? "bi bi-eye-slash" : "bi bi-eye"}></i>
                                </button>
                            </div>
                        </div>

                        <div className="campo">
                            <label htmlFor="confirma_senha">Confirme sua senha</label>
                            <input
                                type={mostrarSenha ? "text" : "password"}
                                id="confirma_senha"
                                name="confirma_senha"
                                placeholder="Confirme sua senha"
                                autoComplete="new-password"
                            />
                        </div>

                        <Link to="/" className="btn-cadastrar">Cadastrar</Link>
                    </form>

                    <p className="login-link">
                        Já possui uma conta? <Link to="/">Entrar</Link>
                    </p>
                </div>
            </div>

            <div className="cadastro-right">
                <img src={Banner} alt="Trabalhador usando equipamentos de proteção" />
            </div>
        </main>
    );
}

export default Cadastro;
