import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

export default function AuthModal() {
    const { showAuthModal, setShowAuthModal, isSignup, setIsSignup } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: ""
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        const url = isSignup
            ? "http://localhost:3000/register"
            : "http://localhost:3000/login";

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || "An error occurred");
                return;
            }

            if (isSignup) {
                setIsSignup(false);
                setFormData({
                    firstname: "",
                    lastname: "",
                    email: "",
                    password: ""
                });
            } else {
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));
                window.dispatchEvent(new Event('storage'));
                setShowAuthModal(false);
                navigate("/upload");
            }
        } catch (err) {
            console.error(err);
            setError("Network error. Please try again.");
        }
    }

    if (!showAuthModal) return null;

    return (
        <div className="modal-backdrop">
            <div className="modal-box">
                <h3>{isSignup ? "Create an Account" : "Login"}</h3>

                {error && (
                    <div className="alert alert-danger">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    {isSignup && (
                        <>
                            <input
                                type="text"
                                name="firstname"
                                placeholder="First Name"
                                value={formData.firstname}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="text"
                                name="lastname"
                                placeholder="Last Name"
                                value={formData.lastname}
                                onChange={handleChange}
                                required
                            />
                        </>
                    )}

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    <button className="modal-btn" type="submit">
                        {isSignup ? "Sign Up" : "Login"}
                    </button>

                    <p className="switch-text">
                        {isSignup ? "Already have an account ?" : "Don't have an account ?"}
                        <span onClick={() => {
                            setIsSignup(!isSignup);
                            setError("");
                        }}>
                            {isSignup ? " Login" : " Sign Up"}
                        </span>
                    </p>
                </form>

                <button className="close-btn" onClick={() => {
                    setShowAuthModal(false);
                    setError("");
                }}>
                    X
                </button>
            </div>
        </div>
    );
}