import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async () => {
    try {
      await API.post("/auth/register/", formData);

      alert("Signup Successful 🚀");

      navigate("/");
    } catch (error) {
      alert("Signup Failed");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Signup</h1>

      <input
        type="text"
        name="username"
        placeholder="Username"
        onChange={handleChange}
      />

      <br /><br />

      <input
        type="email"
        name="email"
        placeholder="Email"
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

      <button onClick={handleSignup}>
        Signup
      </button>

      <p>
        Already have account?
        <a href="/"> Login</a>
      </p>
    </div>
  );
}

export default Signup;