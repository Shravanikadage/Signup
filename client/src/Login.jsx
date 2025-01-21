import { useState } from 'react'; 
import "./Style.css";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/login', { email, password })
            .then(result => {
                console.log(result);
                if (result.data === "Success") {
                    toast.success('Login successful!');
                    setTimeout(() => navigate('/home'), 2000);
                } else {
                    toast.error('Email or password is incorrect!');
                }
            })
            .catch(err => {
                console.log(err);
                toast.error('An error occurred. Please try again.');
            });
    };

    return (
        <div className="d-flex">
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                style={{
                    position: "absolute",
                    top: 0,
                    left: "50%",
                    transform: "translateX(-50%)",
                    textAlign: "center",
                }}
            />
            <div className="form-container">
                <div className="bg-white p-4 rounded shadow-lg" style={{ width: "100%", maxWidth: "400px" }}>
                    <h1>Login</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email">
                                <strong>Email</strong>
                            </label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Enter Email"
                                autoComplete="off"
                                name="email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password">
                                <strong>Password</strong>
                            </label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Enter Password"
                                autoComplete="off"
                                name="password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="btn btn-success">
                            Login
                        </button>
                    </form>
                    <p>Do not have an account?</p>
                    <Link to="/" className="btn btn-default text-decoration-none">
                        Sign Up
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
