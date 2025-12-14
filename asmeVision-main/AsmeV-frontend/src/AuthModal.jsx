
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthModal({ showModal, setShowModal, initialIsSignup = false }) {
    const [isSignup, setIsSignup] = useState(initialIsSignup);
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

            if (isSignup) {
                const data = await response.json();
                
                if (!response.ok) {
                    setError(data.error || "An error occurred");
                    return;
                }

                setIsSignup(false);
                setFormData({
                    firstname: "",
                    lastname: "",
                    email: "",
                    password: ""
                });
            } else {
                const data = await response.json();
                
                console.log("Login response:", data);

                if (!response.ok) {
                    setError(data.error || "Invalid credentials");
                    return;
                }

                if (!data.user || !data.token) {
                    console.error("Invalid response structure:", data);
                    setError("Invalid server response");
                    return;
                }

                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));
                
                window.dispatchEvent(new Event('storage'));
                
                navigate("/upload");
            }
        } catch (err) {
            console.error(err);
            setError("Network error. Please try again.");
        }
    }

    if (!showModal) return null;

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
                    setShowModal(false);
                    setError("");
                    setFormData({
                        firstname: "",
                        lastname: "",
                        email: "",
                        password: ""
                    });
                }}>
                    X
                </button>
            </div>
        </div>
    );
}