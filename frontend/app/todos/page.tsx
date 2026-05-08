'use client';

import axios from 'axios';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

export default function TodosPage() {
  const router = useRouter();

  const [todos, setTodos] = useState([]);

  const [title, setTitle] = useState('');

  const [editingId, setEditingId] =
  useState<number | null>(null);

  const [editTitle, setEditTitle] =
  useState('');

  async function fetchTodos() {
    const token =
      localStorage.getItem('token');

    if (!token) {
      router.push('/login');
      return;
    }

    try {
      const res = await axios.get(
        'http://localhost:3001/todos',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setTodos(res.data);
    } catch (err) {
      router.push('/login');
    }
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

  async function updateTodo(id: number) {
  const token =
    localStorage.getItem('token');

  await axios.patch(
    `http://localhost:3001/todos/${id}`,
    {
      title: editTitle,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  setEditingId(null);

  setEditTitle('');

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

  function logout() {
    localStorage.removeItem('token');

    router.push('/login');
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="max-w-xl mx-auto p-10">
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">
          Todos
        </h1>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2"
        >
          Logout
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
              className="border p-3 flex justify-between items-center"
            >
              {editingId === todo.id ? (
                <input
                  className="border p-2 flex-1 mr-2"
                  value={editTitle}
                  onChange={(e) =>
                    setEditTitle(e.target.value)
                  }
                />
              ) : (
                <p
                  className={
                    todo.completed
                      ? 'line-through'
                      : ''
                  }
                >
                  {todo.title}
                </p>
              )}

              <div className="flex gap-2">
                {editingId === todo.id ? (
                  <button
                    onClick={() =>
                      updateTodo(todo.id)
                    }
                    className="bg-blue-600 text-white px-3 py-1"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setEditingId(todo.id);

                      setEditTitle(todo.title);
                    }}
                    className="bg-yellow-500 text-white px-3 py-1"
                  >
                    Edit
                  </button>
                )}

                <button
                  onClick={() =>
                    deleteTodo(todo.id)
                  }
                  className="bg-red-600 text-white px-3 py-1"
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