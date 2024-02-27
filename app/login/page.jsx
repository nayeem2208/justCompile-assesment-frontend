"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const adminCheck = async () => {
      const adminInfo = localStorage.getItem("adminInfo");
      if (adminInfo) {
        router.replace("/");
        return null;
      }
    };

    adminCheck();
  }, [router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      let login = await axios.post("http://localhost:3000/user/signin", {
        username: username,
        password: password,
      });
      const accessToken = login.data.access_token;
      if (accessToken) {
        localStorage.setItem("adminInfo", accessToken);
        router.replace("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="mx-auto p-6 bg-white shadow-lg w-2/5 rounded-md">
        <h1 className="text-3xl font-bold mb-4 text-emerald-500 text-center">
          Login
        </h1>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Username:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input-field w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-emerald-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-emerald-500"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-emerald-500 text-white py-2 px-4 rounded-md hover:bg-emerald-600 focus:outline-none"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
