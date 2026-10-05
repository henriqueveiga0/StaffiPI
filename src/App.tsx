import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Cadastro from './pages/Cadastro'
import Home from './pages/Home'
import Epis from './pages/Epis'
import Relatorio from './pages/Relatorio'
import Funcionario from './pages/Funcionario'
import Riscos from './pages/Riscos'

function App() {

  return (
    //Browser Router Habilita e gerencia a navegação por rotas da aplicação
      <BrowserRouter>
    {/*Routes: agrupa as rotas disponiveis*/}
        <Routes>
    {/*Define qual componente será exibido para determinada URL*/}
          <Route path='/' element={<Login/>} />
          <Route path='/cadastro' element={<Cadastro/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/epis' element={<Epis/>}/>
          <Route path='/riscos' element={<Riscos/>}/>
          <Route path='/relatorio' element={<Relatorio/>}/>
          <Route path='/funcionario' element={<Funcionario/>}/>
        

        </Routes>
      </BrowserRouter>
  )
}

export default App
;