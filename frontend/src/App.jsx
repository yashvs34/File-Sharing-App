import { BrowserRouter, useNavigate } from 'react-router-dom'
import './App.css'
import AppRoutes from './components/AppRoutes'

function App (authToken)
{
  return (
    <>
      <div>
        <BrowserRouter>
          <AppRoutes/>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
