import { Link } from 'react-router-dom'
import './Cadastro.css'
import Banner from "../assets/Banner.png"

function Cadastro(){
    return(
        <main className='cadastro'>
            <div className="cadastro-left">

                <div className="cadastro-container">
                    <h1>Crie sua conta</h1>
                    <p>Preencha seus dados para começar</p>
                
                <form className='cadastro-form'>
                    <div className='campo'>
                    <label htmlFor="nome">Nome Completo</label>
                    <input type="text" name="nome" id="nome" placeholder='Digite seu nome completo' />
                    </div>

                    <div className='campo'>
                        <label htmlFor='email'>Email</label>
                        <input type='email' name='email' id='email' placeholder='Digite seu email'/>
                    </div>

                    <div className='campo'>
                        <label htmlFor='senha'>Senha</label>
                        <input type='password' id='senha' name='senha' placeholder='Digite sua senha'/>
                    </div>

                    <div className='campo'>
                        <label htmlFor='confirma_senha'>Confirme sua senha</label>
                        <input type='password' id='confirma_senha' name='confirma_senha' placeholder='Confirme sua senha'/>
                    </div>
                    <button type='submit' className='btn-cadastrar'>Cadastrar</button>
                </form>
                <p className='login-link'>Já possuí uma conta?{" "}
                <Link to={"/"}>Entrar</Link>
                </p>
                </div>

            </div>
            <div className="cadastro-right">
            <img src={Banner} alt="Banner trabalhador" />
            </div>
        </main>
    )
}
export default Cadastro