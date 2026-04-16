import { useState } from "react";
import { login } from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const data = await login(username, password);

            localStorage.setItem("token", data.token);

            navigate("/dashboard"); // 🔥 نقلنا للصفحة الجديدة

        } catch (error) {
            alert("Login Failed ❌");
        }
    };

    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundImage:
                    "url('https://images.unsplash.com/photo-1542838132-92c53300491e')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                position: "relative"
            }}
        >
            {/* overlay dark elegant */}
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: "rgba(0,0,0,0.4)"
                }}
            />

            {/* LOGIN CARD */}
            <div
                style={{
                    position: "relative",
                    backdropFilter: "blur(15px)",
                    background: "rgba(255,255,255,0.15)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    padding: "35px",
                    borderRadius: "20px",
                    width: "350px",
                    color: "white",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.3)"
                }}
            >
                <h2 style={{ marginBottom: "10px" }}>Login</h2>
                <p style={{ fontSize: "12px", opacity: 0.8 }}>
                    Welcome back 👋
                </p>

                <input
                    style={{
                        width: "100%",
                        padding: "12px",
                        marginTop: "15px",
                        borderRadius: "10px",
                        border: "none",
                        outline: "none"
                    }}
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input
                    style={{
                        width: "100%",
                        padding: "12px",
                        marginTop: "10px",
                        borderRadius: "10px",
                        border: "none",
                        outline: "none"
                    }}
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    onClick={handleLogin}
                    onMouseDown={(e) =>
                        (e.currentTarget.style.background = "#2ecc71")
                    }
                    onMouseUp={(e) =>
                        (e.currentTarget.style.background = "#000")
                    }
                    style={{
                        width: "100%",
                        padding: "12px",
                        marginTop: "20px",
                        background: "black",
                        color: "white",
                        border: "none",
                        borderRadius: "12px",
                        cursor: "pointer",
                        transition: "0.3s"
                    }}
                >
                    Login
                </button>
            </div>
        </div>
    );
}
export default Login;