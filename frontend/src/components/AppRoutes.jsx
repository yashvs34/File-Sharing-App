import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { authState } from "../atoms/authAtom";
import Signin from '../components/Signin'
import { Route, Routes, useNavigate } from 'react-router-dom'

function AppRoutes ()
{
    const [auth, setAuth] = useRecoilState(authState);
    const navigate = useNavigate();

    useEffect(() => {
        if (auth.isLoggedIn)
        {
            navigate('/dashboard');
        }
    }, [auth.isLoggedIn, navigate]);
    
    return (
        <>
            <Routes>
                <Route path='/' element={<Signin/>} />
                <Route path='/signin' element={<Signin/>} />
                {/* <Route path='/signup' element={<Signup/>} />
                <Route path='/dashboard' element={<Dashboard/>} /> */}
            </Routes>
        </>
    )
}

export default AppRoutes;