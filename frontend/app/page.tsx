'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] =
    useState('');

  const [title, setTitle] = useState('');

  const [todos, setTodos] = useState([]);

  async function register() {
    await axios.post(
      'http://localhost:3001/auth/register',
      {
        email,
        password,
      },
    );

    alert('Registered');
  }

  async function login() {
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

    fetchTodos();
  }

  async function fetchTodos() {
    const token =
      localStorage.getItem('token');

    const res = await axios.get(
      'http://localhost:3001/todos',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    setTodos(res.data);
  }

  async function createTodo() {
    const token =
      localStorage.getItem('token');

    await axios.post(
      'http://localhost:3001/todos',
      {
        title,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    setTitle('');

    fetchTodos();
  }

  async function toggleTodo(
    id: number,
    completed: boolean,
  ) {
    const token =
      localStorage.getItem('token');

    await axios.patch(
      `http://localhost:3001/todos/${id}`,
      {
        completed: !completed,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    fetchTodos();
  }

  async function deleteTodo(id: number) {
    const token =
      localStorage.getItem('token');

    await axios.delete(
      `http://localhost:3001/todos/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    fetchTodos();
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="max-w-xl mx-auto p-10">
      <h1 className="text-3xl font-bold mb-6">
        Todo App
      </h1>

      <div className="space-y-3 mb-10">
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
          className="bg-gray-700 text-white p-2 w-full"
        >
          Register
        </button>

        <button
          onClick={login}
          className="bg-black text-white p-2 w-full"
        >
          Login
        </button>
      </div>

      <div className="flex gap-2 mb-6">
        <input
          placeholder="New Todo"
          className="border p-2 flex-1"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />

        <button
          onClick={createTodo}
          className="bg-blue-600 text-white px-4"
        >
          Add
        </button>
      </div>

      <div className="space-y-3">
        {todos.map((todo: any) => (
          <div
            key={todo.id}
            className="border p-3 flex justify-between"
          >
            <div>
              <p
                className={
                  todo.completed
                    ? 'line-through'
                    : ''
                }
              >
                {todo.title}
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() =>
                  toggleTodo(
                    todo.id,
                    todo.completed,
                  )
                }
                className="bg-green-600 text-white px-2"
              >
                Toggle
              </button>

              <button
                onClick={() =>
                  deleteTodo(todo.id)
                }
                className="bg-red-600 text-white px-2"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}