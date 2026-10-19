import "./Login.css";
import Banner from "../assets/Banner.png";
import { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
    const [mostrarSenha, setMostrarSenha] = useState(false);

    return (
        <main className="login">
            <section className="login-left">
                <img src={Banner} alt="Trabalhador usando equipamentos de proteção" />
            </section>

            <section className="login-right">
                <div className="login-container">
                    <h1>Bem-vindo de volta!</h1>
                    <p>Faça login para acessar sua conta</p>

                    <form className="login-form">
                        <div className="campo">
                            <label htmlFor="email">E-mail</label>
                            <input type="email" name="email" id="email" placeholder="Digite seu e-mail" autoComplete="email" />
                        </div>

                        <div className="campo">
                            <label htmlFor="senha">Senha</label>
                            <div className="campo-senha">
                                <input
                                    type={mostrarSenha ? "text" : "password"}
                                    name="senha"
                                    id="senha"
                                    placeholder="Digite sua senha"
                                    autoComplete="current-password"
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

                        <div className="login-op">
                            <a href="#">Esqueci minha senha</a>
                        </div>

                        <Link to="/home" className="btn-entrar">Entrar</Link>
                    </form>

                    <p className="cadastro-link">
                        Não possui uma conta? <Link to="/cadastro">Cadastre-se</Link>
                    </p>
                </div>
            </section>
        </main>
    );
}

export default Login;
