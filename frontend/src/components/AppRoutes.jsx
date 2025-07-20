import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { authState } from "../atoms/authAtom";
import Signin from './Signin'
import Signup from "./Signup";
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
        else
        {
            navigate('/signin');
        }
    }, [auth.isLoggedIn, navigate]);
    
    return (
        <>
            <Routes>
                <Route path='/' element={<Signin/>} />
                <Route path='/signin' element={<Signin/>} />
                <Route path='/signup' element={<Signup/>} />
                {/* <Route path='/dashboard' element={<Dashboard/>} /> */}
            </Routes>
        </>
    )
}

export default AppRoutes;