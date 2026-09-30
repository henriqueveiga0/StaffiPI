import  "./Login.css"
import Banner from "../assets/Banner.png"

function Login() {
    return (
        <main className="login">
            <section className="login-left">
                <img src={Banner} alt="img-login" />
            </section>

            <section className="login-right">

            
            <div className="login-container">
            <h1>Bem vindo de volta!</h1>
            <p>Faça login para acessar sua conta</p>
            
            <form className="login-form">
                <div className="campo">
                    <label htmlFor="email">E-mail</label>
                    <input type="email" name="email" id="email" placeholder="Digite seu e-mail" />
                </div>
                <div className="campo">
                    <label htmlFor="senha">Senha</label>
                    <input type="password" name="senha" id="senha" placeholder="Digite sua senha" />
                </div>
                <button type="submit" className="btn-entrar">Entrar</button>

            </form>

            </div>

            </section>
        </main>
    )
}
export default Login