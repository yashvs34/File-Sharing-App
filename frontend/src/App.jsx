import { BrowserRouter, Route, Routes } from 'react-router'
import Signin from './components/Signin'
import './App.css'

function App ()
{
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Signin/>} />
          <Route path='/signin' element={<Signin/>} />
          {/* <Route path='/signup' element={<Signup/>} />
          <Route path='/dashboard' element={<Dashboard/>} /> */}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
