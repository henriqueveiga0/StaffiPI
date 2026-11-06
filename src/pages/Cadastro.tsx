import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Cadastro.css";
import Banner from "../assets/staffi-cadastro.png";

const API_URL = "http://localhost:3000/usuarios";

function Cadastro() {
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const navigate = useNavigate();

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmaSenha, setConfirmaSenha] = useState("");
    const [erro, setErro] = useState("");
    const [carregando, setCarregando] = useState(false);

    async function cadastrar(e: FormEvent) {
        e.preventDefault();
        setErro("");

        // A confirmação só existe no front, o back nem recebe esse campo
        if (senha !== confirmaSenha) {
            setErro("As senhas não coincidem.");
            return;
        }

        setCarregando(true);
        try {
            const resposta = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nome, email, senha }),
            });

            if (!resposta.ok) {
                const dados = await resposta.json();
                setErro(Array.isArray(dados.message) ? dados.message.join(" | ") : dados.message);
                return;
            }

            navigate("/"); // cadastrou: volta para o login
        } catch {
            setErro("Não foi possível conectar ao servidor.");
        } finally {
            setCarregando(false); // roda sempre, com erro ou sem erro
        }
    }

    return (
        <main className="cadastro">
            <div className="cadastro-left">
                <div className="cadastro-container">
                    <h1>Crie sua conta</h1>
                    <p>Preencha seus dados para começar</p>

                    <form className="cadastro-form" onSubmit={cadastrar}>
                        <div className="campo">
                            <label htmlFor="nome">Nome Completo</label>
                             <input
                                type="text"
                                name="nome"
                                id="nome"
                                placeholder="Digite seu nome completo"
                                autoComplete="name"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                required
                            />
                        </div>

                        <div className="campo">
                            <label htmlFor="email">Email</label>
                              <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Digite seu e-mail"
                                autoComplete="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
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
                                    value={senha}
                                    onChange={(e) => setSenha(e.target.value)}
                                    required
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
                            value={confirmaSenha}
                            onChange={(e) => setConfirmaSenha(e.target.value)}
                            required
                        />
                    </div>

                          {erro && <p className="form-erro">{erro}</p>}
                        <button type="submit" className="btn-cadastrar" disabled={carregando}>
                            {carregando ? <span className="spinner"></span> : "Cadastrar"}
                        </button>
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
