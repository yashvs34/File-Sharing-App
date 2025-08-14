import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { authState } from "../atoms/authAtom";
import Signin from './Signin';
import Signup from "./Signup";
import Dashboard from "./Dashboard";
import axios from 'axios';
import { Route, Routes, useNavigate } from 'react-router-dom';
import signinState from "../atoms/signinStateAtom";
import { userState } from "../atoms/userAtom";

function AppRoutes ()
{
    const [auth, setAuth] = useRecoilState(authState);
    const [currentState, setCurrentState] = useRecoilState(signinState);
    const [user, setUser] = useRecoilState(userState);
    const navigate = useNavigate();

    useEffect(() => {
        const verifyToken = async () => {
            const token = localStorage.getItem("authToken");
            if (token)
            {
                const response = await axios.post('http://localhost:8081/signin', {
                    "token" : token
                });

                if (response.data.message === "Valid user")
                {
                    setCurrentState({
                        signinState : "Signin successfull"
                    });
                    setAuth({
                        isLoggedIn : true
                    });
                    setUser({
                        user : response.data.userData
                    });
                    navigate('/dashboard');
                }

                return;
            }
        }

        const checkToken = async () => {
            await verifyToken();
    
            if (auth.isLoggedIn)
            {
                navigate('/dashboard');
            }
        }

        checkToken();
    }, [auth.isLoggedIn, navigate]);
    
    return (
        <>
            <Routes>
                <Route path='/' element={<Signin/>} />
                <Route path='/signin' element={<Signin/>} />
                <Route path='/signup' element={<Signup/>} />
                <Route path='/dashboard' element={<Dashboard/>} />
            </Routes>
        </>
    )
}

export default AppRoutes;