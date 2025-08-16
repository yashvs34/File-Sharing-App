import { atom } from "recoil";


const signinState = atom({
    key : 'signinState',
    default : {
        signinState : "INITIAL"
    }
});

export default signinState;