import Dashboard from "./Dashboard";
import { useNavigate } from 'react-router-dom'
import LoginComponent from "./LoginComponent";
import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { authState } from '../atoms/authAtom'
import axios from 'axios'

function AppRoutes ()
{
    const [signedin, setSignedin] = useRecoilState(authState);
    const navigate = useNavigate();

    async function callapi ()
    {
        return await axios('https://swiftly-backend.yashvs34.me/signin', {
            token : authToken
        });
    }

    useEffect(() => {
        if (signedin)
        {
        navigate('dashboard');
        }
        else if (localStorage.getItem('authToken'))
        {
            const result = callapi(localStorage.getItem('authToken'));

            if (result.message === "Valid user")
            {
                setSignedin({
                    isLoggedIn: true
                })
            }
        }
        return;
    }, [signedin]);

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