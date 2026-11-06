import {BrowserRouter,Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Cadastro from './pages/Cadastro'
import Home from './pages/Home'
import Epis from './pages/Epis'
import Relatorio from './pages/Relatorio'
import Funcionario from './pages/Funcionario'
import Riscos from './pages/Riscos'
import NaoEncontrada from './pages/NaoEncontrada'
import CadastroRisco from './pages/CadastroRisco'
import CadastroEpi from './pages/CadastroEpi'
import RotaProtegida from "./components/RotaProtegida"
import CadastrarFuncionario from './pages/CadastrarFuncionario'

function App() {

  return (
    <BrowserRouter>
    <Routes>
  {/* Públicas */}
  <Route path='/' element={<Login/>} />
  <Route path='/cadastro' element={<Cadastro/>}/>

  {/* Só entra quem estiver logado */}
  <Route element={<RotaProtegida/>}>
    <Route path='/home' element={<Home/>}/>
    <Route path='/epis' element={<Epis/>}/>
    <Route path='/riscos' element={<Riscos/>}/>
    <Route path='/relatorio' element={<Relatorio/>}/>
    <Route path='/funcionario' element={<Funcionario/>}/>
    <Route path="/riscos/cadastrar" element={<CadastroRisco />} />
    <Route path="/epis/cadastrar" element={<CadastroEpi/>} />
    <Route path='/funcionario/cadastrar' element={<CadastrarFuncionario/>}/>
  </Route>

  {/* Qualquer endereço que não existe */}
   <Route path='*' element={<NaoEncontrada/>}/>

</Routes>
</BrowserRouter>
  )
}

export default App
;