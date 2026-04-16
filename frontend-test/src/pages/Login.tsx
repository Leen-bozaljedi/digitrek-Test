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
        <div style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "#f5f5f5"
        }}>


            <div style={{
                background: "white",
                padding: "30px",
                borderRadius: "10px",
                width: "352px",
                height: "325px",
                alignItems: "center",
                justifyContent: "center",

                boxShadow: "0 0 10px rgba(0,0,0,0.1)"
            }}>
                <h3>Welcome ..</h3>
                <h2> LogIn</h2>

                <input style={{
                    width: "100%",
                    padding: "10px",
                    marginBottom: "10px",
                    paddingLeft: "3px",
                }}
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <br /><br />

                <input style={{ width: "100%", padding: "10px", marginBottom: "10px", paddingLeft: "3px" }}
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <br /><br />

                <button style={{

                    width: "71%",
                    padding: "14px",
                    background: "black",
                    color: "white",
                    marginLeft: "9%",
                    border: "none",
                    borderRadius: "18px"
                }} onClick={handleLogin}>Login</button>
            </div>
        </div>

    );


}

export default Login;