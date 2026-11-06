import "./Login.css";
import Banner from "../assets/staffi-login.png";
import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_URL = "http://localhost:3000/usuarios";

function Login() {
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");
    const [carregando, setCarregando] = useState(false);

    async function entrar(e: FormEvent) {
        e.preventDefault();
        setErro("");
        setCarregando(true);

        try {
            const resposta = await fetch(`${API_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, senha }),
            });

            if (!resposta.ok) {
                const dados = await resposta.json();
                setErro(Array.isArray(dados.message) ? dados.message.join(" | ") : dados.message);
                return;
            }

            const usuario = await resposta.json();
            // Guarda no navegador quem entrou (fica salvo mesmo fechando a aba)
            localStorage.setItem("usuario", JSON.stringify(usuario));
            navigate("/home");
        } catch {
            setErro("Não foi possível conectar ao servidor.");
        } finally {
            setCarregando(false);
        }
    }

    return (
        <main className="login">
            <section className="login-left">
                <img src={Banner} alt="Trabalhador usando equipamentos de proteção" />
            </section>

            <section className="login-right">
                <div className="login-container">
                    <h1>Bem-vindo de volta!</h1>
                    <p>Faça login para acessar sua conta</p>

                    <form className="login-form" onSubmit={entrar}>
    <div className="campo">
        <label htmlFor="email">E-mail</label>
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
                name="senha"
                id="senha"
                placeholder="Digite sua senha"
                autoComplete="current-password"
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

    <div className="login-op">
        <a href="#">Esqueci minha senha</a>
    </div>

    {erro && <p className="form-erro">{erro}</p>}

    <button type="submit" className="btn-entrar" disabled={carregando}>
        {carregando ? <span className="spinner"></span> : "Entrar"}
    </button>
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
