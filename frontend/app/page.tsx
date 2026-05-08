'use client';

import axios from 'axios';
import { useState } from 'react';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function login() {
    try {
      const res = await axios.post(
        'http://localhost:3001/auth/login',
        {
          email,
          password,
        },
      );

      localStorage.setItem(
        'token',
        res.data.access_token,
      );

      alert('Login successful');
    } catch (err) {
      alert('Login failed');
    }
  }

  async function register() {
    try {
      await axios.post(
        'http://localhost:3001/auth/register',
        {
          email,
          password,
        },
      );

      alert('Registered successfully');
    } catch (err) {
      alert('Register failed');
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="space-y-4 w-80">
        <input
          className="border p-2 w-full"
          placeholder="Email"
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          className="border p-2 w-full"
          placeholder="Password"
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          className="bg-black text-white p-2 w-full"
          onClick={login}
        >
          Login
        </button>

        <button
          className="bg-gray-700 text-white p-2 w-full"
          onClick={register}
        >
          Register
        </button>
      </div>
    </div>
  );
}