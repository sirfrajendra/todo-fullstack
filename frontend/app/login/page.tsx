'use client';

import axios from 'axios';

import { useRouter } from 'next/navigation';

import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');

  const [password, setPassword] =
    useState('');

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

      router.push('/todos');
    } catch (err: any) {
      alert(
        err.response?.data?.message ||
          'Login failed',
      );
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-80 space-y-4">
        <h1 className="text-3xl font-bold">
          Login
        </h1>

        <input
          placeholder="Email"
          className="border p-2 w-full"
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full"
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          onClick={login}
          className="bg-black text-white p-2 w-full"
        >
          Login
        </button>

        <p>
          No account?{' '}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() =>
              router.push('/register')
            }
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}