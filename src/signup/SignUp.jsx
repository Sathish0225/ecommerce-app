import React, { useContext, useState } from 'react'
import { AuthContext } from '../contexts/AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import logo from "../assets/images/logo/logo.png";

const title = "Register";
const btnText = "Get Started Now";

const SignUp = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const { signInWithGoogle, createUser } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || "/";

    const handleRegister = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const confirmPassword = form.confirmPassword.value;
        if (password !== confirmPassword) {
            setErrorMessage("Password did not match! Please try again.");
        } else {
            setErrorMessage("");
            createUser(email, password)
                .then(result => {
                    const user = result.user;
                    form.reset();
                    navigate(from, { replace: true });
                })
                .catch(error => {
                    console.error(error.message);
                    setErrorMessage(error.message);
                })
        }
    }

    // handle gmail
    const handleGmail = () => {
        signInWithGoogle()
            .then(result => {
                const user = result.user;
                navigate(from, { replace: true });
            })
            .catch(error => {
                console.error(error.message);
                setErrorMessage("Please enter valid email address & password!");
            })
    }

    return (
        <div>
            <div className='register-section padding-tb section-bg'>
                <div className="container">
                    <div className="account-wrapper">
                        {/* logo */}
                        <div className="logo-search-acte">
                            <div className="logo">
                                <Link to={"/"}>
                                    <img src={logo} alt="logo" />
                                </Link>
                            </div>
                        </div>
                        <br />
                        {/* account form */}
                        <h3 className="title">{title}</h3>
                        <form className='account-form' onSubmit={handleRegister}>
                            <div className="form-group">
                                <input type="text" name="name" id="name" placeholder="Name *" required />
                            </div>
                            <div className="form-group">
                                <input type="email" name="email" id="email" placeholder="Email *" required />
                            </div>
                            <div className="form-group">
                                <input type="password" name="password" id="password" placeholder="Password *" required />
                            </div>
                            <div className="form-group">
                                <input type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirm Password *" required />
                            </div>

                            {/* show error message */}
                            <div>
                                {errorMessage && <div className='error-message text-danger mb-3'>{errorMessage}</div>}
                            </div>

                            <div className="form-group">
                                <button type='submit' className="d-block lab-btn"><span>{btnText}</span></button>
                            </div>
                        </form>

                        {/* account bottom */}
                        <div className="account-bottom">
                            <span className='d-block cate pt-10'>Are you a member? <Link to={"/login"}>Login</Link></span>
                            <span className="or">
                                <span>or</span>
                            </span>

                            {/* social login */}
                            <button className="bg-light btn btn-block text-dark w-100 px-5 py-2 border" onClick={handleGmail}>
                                <svg width="24px" height="24px" viewBox="-3 0 262 262" xmlns="http://www.w3.org/2000/svg"
                                    preserveAspectRatio="xMidYMid" fill="#000000">
                                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                    <g id="SVGRepo_iconCarrier">
                                        <path d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" fill="#4285F4"></path><path d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" fill="#34A853"></path><path d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" fill="#FBBC05"></path><path d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" fill="#EB4335"></path></g>
                                </svg>  Sign in with Google</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp
