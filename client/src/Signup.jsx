import { useState } from "react";
import "./Style.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePic, setProfilePic] = useState(null); // State for file upload
  const [errorMessage, setErrorMessage] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validatePassword(password)) {
      setErrorMessage(
        "Password must contain at least 8 characters, including an uppercase letter, a lowercase letter, a number, and a special character."
      );
      return;
    }
    setErrorMessage("");

    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
      return;
    }
    setConfirmPasswordError("");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("profilePic", profilePic);

    axios
      .post("http://localhost:3001/register", formData)
      .then(() => {
        toast.success("Registration successful!");
        setTimeout(() => navigate("/login"), 2000);
      })
      .catch(() => {
        toast.error("Registration failed! Please try again.");
      });
  };

  return (
    <div className="d-flex">
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="bg-white">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name">
              <strong>Name</strong>
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter Name"
              autoComplete="off"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter Email"
              autoComplete="off"
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
              onChange={(e) => setPassword(e.target.value)}
            />
            {errorMessage && <p className="text-danger">{errorMessage}</p>}
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword">
              <strong>Confirm Password</strong>
            </label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm Password"
              autoComplete="off"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {confirmPasswordError && (
              <p className="text-danger">{confirmPasswordError}</p>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="profilePic">
              <strong>Profile Picture</strong>
            </label>
            <input
              type="file"
              id="profilePic"
              onChange={(e) => setProfilePic(e.target.files[0])}
            />
          </div>
          <button type="submit" className="btn btn-success">
            Register
          </button>
        </form>
        <p>Already Have an Account</p>
        <Link to="/login" className="btn btn-default text-decoration-none">
          Login
        </Link>
      </div>
    </div>
  );
}

export default Signup;
