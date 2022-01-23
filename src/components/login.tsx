import React from 'react'
import "../sass/login.scss"
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from "../firebase"

function Login() {
    function signInWithGoogle() {
        signInWithPopup(auth, provider)
    }
    return (
        <div className="login">
            Login
            <button onClick={signInWithGoogle}>
                Sign in With Google
            </button>
        </div>
    )
}

export default Login
