import Dashboard from "./Dashboard";
import LoginComponent from "./LoginComponent";
import { Route, Routes } from 'react-router-dom';

function AppRoutes ()
{    
    return (
        <>
            <Routes>
                <Route path='/' element={<LoginComponent/>} />
                <Route path='/dashboard' element={<Dashboard/>} />
            </Routes>
        </>
    )
}

export default AppRoutes;