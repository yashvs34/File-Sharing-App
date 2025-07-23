import { atom } from "recoil";


const signinState = atom({
    key : 'signinState',
    default : {
        signinState : ""
    }
});

export default signinState;