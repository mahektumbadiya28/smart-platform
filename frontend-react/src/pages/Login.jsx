import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    try {
      const response = await API.post("/auth/login/", formData);

      localStorage.setItem("token", response.data.access);

      alert("Login Successful 🚀");

      navigate("/dashboard");
    } catch (error) {
      alert("Invalid Credentials");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Login</h1>

      <input
        type="text"
        name="username"
        placeholder="Username"
        onChange={handleChange}
      />

      <br /><br />

      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
      />

      <br /><br />

      <button onClick={handleLogin}>
        Login
      </button>

      <p>
        Don't have account?
        <a href="/signup"> Signup</a>
      </p>
    </div>
  );
}

export default Login;