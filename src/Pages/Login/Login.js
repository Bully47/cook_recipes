import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, signInWithEmailAndPassword, signInWithGoogle } from "../../Config/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Login.css";
function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    useEffect(() => {
        if (loading) {
            // maybe trigger a loading screen
            return;
        }
        if (user) navigate("/dashboard");
    }, [user, loading]);
    return (
        <div className="login_page">
            <div className="login_container">
                <input
                    type="text"
                    className="login_input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Adresse e-mail"
                />
                <input
                    type="password"
                    className="login_input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mot de Passe"
                />
                <button
                    className="blue_btn"
                    onClick={() => signInWithEmailAndPassword(email, password)}
                >
                    Login
                </button>
                
                <button className="blue_icon_btn" onClick={signInWithGoogle}>
                    <svg viewBox="0 0 24 24" className="login_google_icon">
                        <path d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1V11.1Z" />
                    </svg>
                    Google Login
                </button>

                <div>
                    <Link className="reset_link" to="/reset">Mot de Passe oublié</Link>
                </div>
                <div>
                    Pas de compte ? <Link to="/register">Créez en un</Link> maintenant.
                </div>
            </div>
        </div>
    );
}
export default Login;