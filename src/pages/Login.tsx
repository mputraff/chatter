import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import ButtonLogin from "../components/Button";
import axios from "axios";
import { useUser } from "../UserContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setUser } = useUser(); // Access the user context
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://api-chatter-tau.vercel.app/api/auth/login",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("Login success: ", response.data);

      // Simpan token dan data pengguna ke localStorage
      localStorage.setItem("token", response.data.token);
      setUser(response.data.data); // Pastikan ini mengarah ke data yang benar

      // Navigasi ke halaman utama
      navigate("/home");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || "Login failed");
      }
    }
  };
  

  return (
    <section className="h-screen bg-gray-950 flex items-center justify-center">
      <div className="w-full max-w-md p-6 rounded-lg shadow-lg">
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <h3 className="text-4xl text-left text-white mb-6">Login</h3>
          <Input
            icon="fa-solid fa-user"
            placeholder="Email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            icon="fa-solid fa-lock"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="text-right text-white">Forgot Password?</p>
          {error && <p className="text-red-500">{error}</p>}
          <ButtonLogin name={"Sign In"} type="submit" />
          <p className="flex gap-1 text-base text-white text-center">
            Don't have an account?
            <Link
              to="/register"
              className="hover:underline transition duration-300"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}
