'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function RegisterPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] =
    useState('');

  async function register() {
    try {
      await axios.post(
        'http://localhost:3001/auth/register',
        {
          email,
          password,
        },
      );

      alert('Registration successful');

      router.push('/login');
    } catch (err: any) {
      alert(
        err.response?.data?.message ||
          'Register failed',
      );
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-80 space-y-4">
        <h1 className="text-3xl font-bold">
          Register
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
          onClick={register}
          className="bg-black text-white p-2 w-full"
        >
          Register
        </button>

        <p>
          Already have an account?{' '}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() =>
              router.push('/login')
            }
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}