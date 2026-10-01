import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Cadastro from './pages/Cadastro'

function App() {

  return (
    //Browser Router Habilita e gerencia a navegação por rotas da aplicação
      <BrowserRouter>
    {/*Routes: agrupa as rotas disponiveis*/}
        <Routes>
    {/*Define qual componente será exibido para determinada URL*/}
          <Route path='/' element={<Login/>} />
          <Route path='/cadastro' element={<Cadastro/>}/>

        </Routes>
      </BrowserRouter>
  )
}

export default App
