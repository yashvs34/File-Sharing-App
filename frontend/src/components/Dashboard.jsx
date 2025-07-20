import { useRecoilState } from "recoil"
import { authState } from "../atoms/authAtom"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard ()
{
    const [auth, setAuth] = useRecoilState(authState);
    const navigate = useNavigate();

    useEffect(() => {
        if (!auth.isLoggedIn)
        {
            navigate('/signin');
        }
    });

    return (<>hi</>)
}

export default Dashboard